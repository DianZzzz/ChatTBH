import Head from 'next/head';
import Image from 'next/image';
import buildspaceLogo from '../assets/buildspace-logo.png';
import {useState} from 'react';

const Home = () => {

  const [userInput, setUserInput] = useState('');
  const [apiOutput, setApiOutput] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  const onUserChangedText = (event) => {
        setUserInput(event.target.value);
      };
  
  const callGenerateEndpoint = async () => {
        setIsGenerating(true);
  
        console.log("Calling OpenAI...");
        const response = await fetch('/api/generate', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ userInput }),
          });
  
        const data = await response.json();
        const { output } = data;
        console.log("OpenAI replied...", output.text)
  
        setApiOutput(`${output.text}`);
        setIsGenerating(false);
      };

  return (
    <div className="root">
      <Head>
        <title>ChatTBH</title>
      </Head>

      <div className="container">
        <div className="header">
          <div className="header-title">
            <h1>Chat<span style={{color:"#FF5864", fontWeight:"bolder"}}>T</span><span style={{color:"#FFC629", fontWeight:"bolder"}}>B</span><span style={{color:"#B026FF", fontWeight:"bolder"}}>H</span></h1>
          </div>
          <div className="header-subtitle">
            <h2>Up your game on <span style={{color:"#FF5864", fontWeight:"bolder"}}>Tinder</span>, <span style={{color:"#FFC629", fontWeight:"bolder"}}>Bumble</span> and <span style={{color:"#B026FF", fontWeight:"bolder"}}>Hinge</span> with GPT3</h2>
          </div>
          <div>
            <p>Say goodbye to those awkward silences and hello to a smooooth dating experience! Introducing ChatTBH, your wingman in the digital dating world. This web app serves up a platter of fresh and flirty conversation starters, guaranteed to make your matches swoon. No more struggling to think of something clever to say, let our app do the heavy lifting while you sit back, relax, and enjoy the ride. So, whether you're a seasoned swiper or a dating app newbie, give ChatTBH a try and let the sparks fly! </p>          
          </div>
        </div>
        <div className="prompt-container">
          <textarea 
            placeholder="Who are you talking with? We need a bit more details to customize your message. For example, you can say something like 'female, 25yr, nice smile, outdoorsy, from texas' or simply 'very hot'" 
            className="prompt-box" 
            value = {userInput}
            onChange={onUserChangedText}
          />
          <div className="prompt-button">
            <a 
              className={isGenerating ? "generate-button loading" : "generate-button"}
              onClick={callGenerateEndpoint}
            >
              <div className="generate">
              {isGenerating ? <span className="loader"></span> : (<p>Generate</p>)}
              </div>
            </a>
          </div>
          {apiOutput && (
          <div className="output">
            <div className="output-header-container">
              <div className="output-header">
                <h3>Output</h3>
              </div>
            </div>
            <div className="output-content">
              <p>{apiOutput}</p>
            </div>
        </div>
        )}
        </div>
      </div>

      <div className="badge-container grow">
        <a
          href="https://buildspace.so/builds/ai-writer"
          target="_blank"
          rel="noreferrer"
        >
          <div className="badge">
            <Image src={buildspaceLogo} alt="buildspace logo" />
            <p>build with buildspace</p>
          </div>
        </a>
      </div>
    </div>
  );
};

export default Home;
