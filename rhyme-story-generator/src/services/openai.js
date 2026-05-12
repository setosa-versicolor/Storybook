// OpenAI API service for story and image generation

const OPENAI_API_URL = 'https://api.openai.com/v1';

/**
 * Generate a humorous rhyming story based on a prompt
 */
export async function generateStory(apiKey, prompt) {
  const systemPrompt = `You are a whimsical children's book author who writes humorous rhyming stories. 
Your stories should:
- Be funny and engaging for all ages
- Use AABB or ABAB rhyme schemes consistently
- Have 6-8 short verses/pages (2-4 lines each)
- Include vivid, imaginative imagery that would work well as illustrations
- Have a light-hearted, playful tone
- Include a satisfying (possibly silly) ending

Respond with a JSON object in this exact format:
{
  "title": "The Story Title",
  "pages": [
    {
      "text": "The rhyming verse for this page",
      "imagePrompt": "A detailed description for generating an illustration for this page"
    }
  ]
}

Make the imagePrompt descriptions:
- Colorful and whimsical
- Suitable for a children's book illustration style
- Specific about characters, setting, and action
- Include art style hints like "watercolor style", "playful cartoon", "warm colors"`;

  const userPrompt = `Create a funny rhyming story about: ${prompt}

Remember to make it humorous with clever wordplay, unexpected twists, and silly situations. Each verse should be 2-4 lines that rhyme well.`;

  try {
    const response = await fetch(`${OPENAI_API_URL}/chat/completions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'gpt-4o',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userPrompt },
        ],
        temperature: 0.9,
        max_tokens: 2000,
        response_format: { type: 'json_object' },
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error?.message || 'Failed to generate story');
    }

    const data = await response.json();
    const content = data.choices[0].message.content;
    
    try {
      const storyData = JSON.parse(content);
      
      // Validate the response structure
      if (!storyData.title || !Array.isArray(storyData.pages)) {
        throw new Error('Invalid story format received');
      }

      return storyData;
    } catch (parseError) {
      console.error('Failed to parse story JSON:', parseError);
      throw new Error('Failed to parse story response');
    }
  } catch (error) {
    console.error('Story generation error:', error);
    throw error;
  }
}

/**
 * Generate images for each page of the story
 */
export async function generateImages(apiKey, story) {
  const storyWithImages = {
    ...story,
    pages: [...story.pages],
  };

  // Generate images in parallel (but limit concurrency to avoid rate limits)
  const batchSize = 3;
  
  for (let i = 0; i < story.pages.length; i += batchSize) {
    const batch = story.pages.slice(i, i + batchSize);
    const imagePromises = batch.map((page, batchIndex) => 
      generateImage(apiKey, page.imagePrompt, i + batchIndex)
    );

    try {
      const imageUrls = await Promise.all(imagePromises);
      
      imageUrls.forEach((url, batchIndex) => {
        storyWithImages.pages[i + batchIndex] = {
          ...storyWithImages.pages[i + batchIndex],
          imageUrl: url,
        };
      });
    } catch (error) {
      console.error(`Failed to generate batch ${i}:`, error);
      // Continue with remaining images even if some fail
    }
  }

  return storyWithImages;
}

/**
 * Generate a single image using DALL-E
 */
async function generateImage(apiKey, prompt, pageIndex) {
  const enhancedPrompt = `Children's book illustration, whimsical and colorful: ${prompt}. 
Style: soft watercolor, friendly characters, warm lighting, playful atmosphere, suitable for young readers.`;

  try {
    const response = await fetch(`${OPENAI_API_URL}/images/generations`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'dall-e-3',
        prompt: enhancedPrompt,
        n: 1,
        size: '1024x1024',
        quality: 'standard',
        style: 'vivid',
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      console.error(`Image generation failed for page ${pageIndex}:`, error);
      throw new Error(error.error?.message || 'Failed to generate image');
    }

    const data = await response.json();
    return data.data[0].url;
  } catch (error) {
    console.error(`Image generation error for page ${pageIndex}:`, error);
    // Return null instead of throwing to allow partial success
    return null;
  }
}
