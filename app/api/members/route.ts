import { NextResponse } from 'next/server';

export async function GET() {
  const token = process.env.GITHUB_TOKEN;
  
  // Debug logging
  console.log('Token prefix:', token?.slice(0, 4));
  
  if (!token) {
    console.error('GITHUB_TOKEN is not set');
    return NextResponse.json({ 
      count: 0, 
      error: 'GitHub token is not configured',
      status: 500 
    }, { status: 500 });
  }

  try {
    const response = await fetch('https://api.github.com/orgs/uoucat/members', {
      headers: {
        'Authorization': `token ${token}`,  // Using 'token' prefix
        'Accept': 'application/vnd.github.v3+json',
        'X-GitHub-Api-Version': '2022-11-28',
        'User-Agent': 'uoucat-app'  // Adding User-Agent header
      },
      cache: 'no-store'
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('GitHub API Error Status:', response.status);
      console.error('GitHub API Error Body:', errorText);
      return NextResponse.json({ 
        count: 0, 
        error: errorText,
        status: response.status 
      }, { status: response.status });
    }

    const members = await response.json();
    return NextResponse.json({ count: members.length });
    
  } catch (error) {
    console.error('Fetch Error:', error);
    return NextResponse.json({ 
      count: 0, 
      error: error instanceof Error ? error.message : 'Internal server error',
      status: 500 
    }, { status: 500 });
  }
}