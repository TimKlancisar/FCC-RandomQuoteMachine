import axios from "axios";
import { useRef, useState, useEffect } from "react";
import dragElement from "../features/drag";

function QuoteCard(props) {
    let url = 'https://goquotes-api.herokuapp.com/api/v1/random?count=1';
    const draggable = useRef(null);
    const [update, setUpdate]= useState([]);
    const newQuote= (text) => {
        axios.get(url).then(response => setQuoteInfo(response.data.quotes[0]))
        setUpdate(text);
    }
    const [quoteInfo, setQuoteInfo]= useState(newQuote); 
    const copyQuote = () => {
        let copyText = quoteInfo.text + ' -' + quoteInfo.author;
        navigator.clipboard.writeText(copyText)
        setUpdate('The quote was copied to your clipboard.')
    }
    const tweeted = () => {
        setUpdate('You tweeted this quote.')
    }
    const handleMouse = (ref) => dragElement(ref);

    if(quoteInfo) {
    return <div id="quote-box" ref={draggable}>
        <header className="top-bar" onMouseDown={(e) => handleMouse(e.target.parentElement)}>
        <div className="window-title">
        <img src="./command-prompt.jpg" alt="cmd-icon" draggable='false' />
        <h1>Random Quote Generator</h1>
        </div>
        <div className="social-media">
        <button onClick={copyQuote}><svg aria-hidden="true" focusable="false" data-prefix="far" data-icon="copy" className="svg-inline--fa fa-copy fa-w-14" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="currentColor" d="M433.941 65.941l-51.882-51.882A48 48 0 0 0 348.118 0H176c-26.51 0-48 21.49-48 48v48H48c-26.51 0-48 21.49-48 48v320c0 26.51 21.49 48 48 48h224c26.51 0 48-21.49 48-48v-48h80c26.51 0 48-21.49 48-48V99.882a48 48 0 0 0-14.059-33.941zM266 464H54a6 6 0 0 1-6-6V150a6 6 0 0 1 6-6h74v224c0 26.51 21.49 48 48 48h96v42a6 6 0 0 1-6 6zm128-96H182a6 6 0 0 1-6-6V54a6 6 0 0 1 6-6h106v88c0 13.255 10.745 24 24 24h88v202a6 6 0 0 1-6 6zm6-256h-64V48h9.632c1.591 0 3.117.632 4.243 1.757l48.368 48.368a6 6 0 0 1 1.757 4.243V112z"></path></svg></button>
        <button id="new-quote" onClick={() => newQuote('New quote has been generated.')}><svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="plus" className="svg-inline--fa fa-plus fa-w-14" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="currentColor" d="M416 208H272V64c0-17.67-14.33-32-32-32h-32c-17.67 0-32 14.33-32 32v144H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h144v144c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32V304h144c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z"></path></svg></button>
        <a onClick={tweeted} id="tweet-quote" href={'https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text=' + quoteInfo.text + ' -' + quoteInfo.author} target='_blank' rel="noreferrer"><svg id="yeet" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="twitter" className="svg-inline--fa fa-twitter fa-w-16" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M459.37 151.716c.325 4.548.325 9.097.325 13.645 0 138.72-105.583 298.558-298.558 298.558-59.452 0-114.68-17.219-161.137-47.106 8.447.974 16.568 1.299 25.34 1.299 49.055 0 94.213-16.568 130.274-44.832-46.132-.975-84.792-31.188-98.112-72.772 6.498.974 12.995 1.624 19.818 1.624 9.421 0 18.843-1.3 27.614-3.573-48.081-9.747-84.143-51.98-84.143-102.985v-1.299c13.969 7.797 30.214 12.67 47.431 13.319-28.264-18.843-46.781-51.005-46.781-87.391 0-19.492 5.197-37.36 14.294-52.954 51.655 63.675 129.3 105.258 216.365 109.807-1.624-7.797-2.599-15.918-2.599-24.04 0-57.828 46.782-104.934 104.934-104.934 30.213 0 57.502 12.67 76.67 33.137 23.715-4.548 46.456-13.32 66.599-25.34-7.798 24.366-24.366 44.833-46.132 57.827 21.117-2.273 41.584-8.122 60.426-16.243-14.292 20.791-32.161 39.308-52.628 54.253z"></path></svg></a>
        </div>
        </header>
        <div className="console-body">
        <p>Microsoft Windows [Version 10.0.19042.1348]</p>
        <p>(c) Microsoft Corporation. All rights reserved.</p><br />
        <blockquote id="text">{quoteInfo.text}</blockquote>
        <figcaption id="author">{quoteInfo.author}</figcaption>
        <p>Get a new quote by pressing the "+" button.</p><br />
        <p>{update}</p><span>_</span>
        </div>
    </div>
    }
    else {
        return null
    }
}

export default QuoteCard;