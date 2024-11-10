const saveIssue = async (issueTitle, description) => {
    const response = await fetch('/api/issue', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ issueTitle, description }),
    });
  
    if (response.ok) {
      console.log('Issue saved!');
    } else {
      console.log('Error saving issue');
    }
  };
  