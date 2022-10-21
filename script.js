let textarea = document.querySelector('#text');
let voiceList = document.querySelector('#voice');
let speechButton = document.querySelector('.submit');
let wrapper = document.querySelector('.main');
let volume = document.querySelector('.volume');
let rate = document.querySelector('.rate');

let synth = speechSynthesis;
let isSpeaking = true;

function voiceSpeech() {
	for (let voice of synth.getVoices()) {
		let option = document.createElement('option');
		option.text = voice.name;
		voiceList.add(option);
		// console.log(option);
	}
}

synth.addEventListener('voiceschanged', voiceSpeech);

function textToSpeech(text) {
	let utterance = new SpeechSynthesisUtterance(text);
	for (let voice of synth.getVoices()) {
		if (voice.name === voiceList.value) {
			utterance.voice = voice;
			utterance.volume = volume.value;
			utterance.rate = rate.value;
		}
	}
	speechSynthesis.speak(utterance);
}

wrapper.onchange = ({ target }) => {
	if (target.type !== "range") return;
	handleChange(target);
};

function handleChange(el) {
	el.nextElementSibling.textContent = el.value;
}

speechButton.addEventListener('click', (e) => {
	e.preventDefault();
	if (textarea.value != "") {
		if (!synth.speaking) {
			textToSpeech(textarea.value);
		}
		if (textarea.value.length > 80) {
			if (isSpeaking) {
				synth.resume();
				isSpeaking = false;
				speechButton.innerHTML = 'Pause speech';
			} else {
				synth.pause();
				isSpeaking = true;
				
				speechButton.innerHTML = 'Resume speech';
			}
			setInterval(() => {
				if (!synth.speaking && !isSpeaking) {
					isSpeaking = true;
					speechButton.innerHTML = 'Convert to speech';
				}
			})
		} else {
			speechButton.innerHTML = 'Convert to speech';
		}
	}
})