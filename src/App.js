import React, { useState } from 'react';
import { Configuration, OpenAIApi } from 'openai';
import './App.css';

function App() {
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');

  const handleChange = (e) => {
    setInputText(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const configuration = new Configuration({
      apiKey: process.env.REACT_APP_OPENAI_API_KEY,
    });
    const openai = new OpenAIApi(configuration);

    try {
      const response = await openai.createCompletion({
        model: 'text-davinci-003',
        prompt: inputText,
        max_tokens: 50,
        temperature: 1,
      });
      setOutputText(response.data.choices[0].text);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="App">
      <h1>Generative AI Demo</h1>
      <p>
        The completion function generates text based on a given prompt. It
        predicts the most likely continuation of the input text, taking into
        account context, grammar, and content. You can control the creativity
        and randomness of the generated text by adjusting the temperature.
      </p>
      <h2>Examples:</h2>
      <ul>
        <li>
          <strong>Prompt:</strong> Translate the following English text to
          French: "{`Hello, how are you?`}"
          <br />
          <strong>Completion:</strong> "Bonjour, comment ça va?"
        </li>
        <li>
          <strong>Prompt:</strong> Write a brief summary of the book "The
          Catcher in the Rye."
          <br />
          <strong>Completion:</strong> "The Catcher in the Rye is a
          coming-of-age novel by J.D. Salinger that follows the experiences of
          the protagonist, Holden Caulfield, as he navigates adolescence,
          alienation, and the search for authenticity in a superficial world."
        </li>
      </ul>
      <h2>Business Use Cases:</h2>
      <ul>
        <li>Automated customer support</li>
        <li>Content generation and curation</li>
        <li>Language translation</li>
        <li>Email drafting and summarization</li>
        <li>Social media management</li>
      </ul>
      <form onSubmit={handleSubmit}>
        <textarea
          id="input-textarea"
          placeholder="Type your text here..."
          value={inputText}
          onChange={handleChange}
        />
        <button type="submit">Generate</button>
      </form>
      {outputText && <div className="output">{outputText}</div>}
    </div>
  );
}

export default App;
