const saveConversation = async (messages) => {
    const response = await fetch('/api/conversation', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ messages }),
    });
  
    if (response.ok) {
      console.log('Conversation saved!');
    } else {
      console.log('Error saving conversation');
    }
  };
  