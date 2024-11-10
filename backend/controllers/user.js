const saveUser = async (name, age, state) => {
    const response = await fetch('/api/user', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, age, state }),
    });
  
    if (response.ok) {
      console.log('User saved!');
    } else {
      console.log('Error saving user');
    }
  };