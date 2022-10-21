let textarea = document.querySelector('#text');
let voiceList = document.querySelector('#voice');
let speechButton = document.querySelector('.submit');

let synth = speechSynthesis;
let isSpeaking = true;

function voiceSpeech() {
	for (let voice of synth.getVoices()) {
		let option = document.createElement('option');
		option.text = voice.name;
		voiceList.add(option);
		console.log(option);
	}
}

synth.addEventListener('voiceschanged', voiceSpeech);

function textToSpeech(text) {
	let utterance = new SpeechSynthesisUtterance(text);
	for (let voice of synth.getVoices()) {
		if (voice.name === voiceList.value) {
			utterance.voice = voice;
		}
	}
	speechSynthesis.speak(utterance);
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