//Speech synth API
const synth=window.speechSynthesis;

//DOM Elemets
const textform= document.querySelector('form');
const textInput= document.querySelector('#text-input');
const voiceSelect= document.querySelector('#voice-select');
const rate= document.querySelector('#rate');
const rateValue= document.querySelector('#rate-value');
const pitch= document.querySelector('#pitch');
const pitchValue= document.querySelector('#pitch-value');
const body= document.querySelector('body');


//voices
let voices = [];
const getVoices = ()=>{
    voices = synth.getVoices();
    voices.forEach(voice =>{
        let option=document.createElement('option');
        option.textContent=voice.name+'('+voice.lang+')';
        option.setAttribute('data-lang',voice.lang);
        option.setAttribute('data-name',voice.name);
        voiceSelect.appendChild(option);
    });
};
if(synth.onvoiceschanged!==undefined){
    synth.onvoiceschanged= getVoices;
}

//speak
const speak=()=>{
    
    if(synth.speaking){
        console.error("Already Speaking..");
        return;
    }
    if(textInput.value !== ''){
        
        body.style.background='#141414 url(imagewave.gif)';
        body.style.backgroundRepeat='-x';
        body.style.backgroundSize='100% 100%'

        const speaktext = new SpeechSynthesisUtterance(textInput.value);
        speaktext.onend = e => {
            console.log("Done Speaking..");
            body.style.background='#141414';
        }
        speaktext.onerror=e=>{
            console.error("Error..");
        }

        const selectedVoice= voiceSelect.selectedOptions[0].getAttribute('data-name');
        voices.forEach(voice =>{
            if(selectedVoice===voice.name){
                speaktext.voice=voice;
            }
        });
        speaktext.rate=rate.value;
        speaktext.pitch=pitch.value;

        synth.speak(speaktext);
    }
};

//Event Listeners
textform.addEventListener('submit',e=>{
    e.preventDefault();
    speak();
    textInput.blur();
});

rate.addEventListener('change',e=>rateValue.textContent=rate.value);
pitch.addEventListener('change',e=>pitchValue.textContent=pitch.value);
voiceSelect.addEventListener('change',e=> speak());
