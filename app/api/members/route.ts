import { NextResponse } from 'next/server';

export async function GET() {
  try {
    console.log('GITHUB_TOKEN exists:', !!process.env.GITHUB_TOKEN);
    
    const url = 'https://api.github.com/orgs/uoucat/members?per_page=100&role=all&state=active';
    console.log('Fetching from:', url);

    const response = await fetch(url, {
      headers: {
        'Authorization': `Bearer ${process.env.GITHUB_TOKEN}`,
        'Accept': 'application/vnd.github.v3+json',
        'X-GitHub-Api-Version': '2022-11-28'
      },
      cache: 'no-store'
    });

    console.log('Response status:', response.status);

    if (!response.ok) {
      const error = await response.text();
      console.error('GitHub API Error:', error);
      return NextResponse.json({ 
        count: 0, 
        error: error,
        status: response.status 
      }, { status: response.status });
    }

    const members = await response.json();
    console.log('Found members:', members.length);
    
    return NextResponse.json({ 
      count: members.length,
      success: true 
    });
    
  } catch (error) {
    console.error('Detailed error:', error);
    return NextResponse.json({ 
      count: 0, 
      error: error instanceof Error ? error.message : 'Internal server error',
      status: 500 
    }, { status: 500 });
  }
}