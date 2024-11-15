import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Using the admin endpoint to get all members
    const response = await fetch('https://api.github.com/orgs/uoucat/members?per_page=100&role=all&state=active', {
      headers: {
        'Authorization': `Bearer ${process.env.GITHUB_TOKEN}`,
        'Accept': 'application/vnd.github.v3+json',
        'X-GitHub-Api-Version': '2022-11-28'
      },
    });

    if (!response.ok) {
      const error = await response.text();
      console.error('GitHub API Error:', error);
      return NextResponse.json({ 
        count: 0, 
        error: error,
        status: response.status 
      });
    }

    const members = await response.json();
    console.log('Found members:', members.length); // Debug log
    return NextResponse.json({ count: members.length });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({ 
      count: 0, 
      error: 'Internal server error',
      status: 500 
    });
  }
}