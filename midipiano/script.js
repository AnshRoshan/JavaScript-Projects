const audioContext = new AudioContext();

const NOTE_DETAILS = [
  { note: "C", key: "A", frequency: 261.626, active: false },
  { note: "Db", key: "S", frequency: 277.183, active: false },
  { note: "D", key: "D", frequency: 293.665, active: false },
  { note: "Eb", key: "F", frequency: 311.127, active: false },
  { note: "E", key: "G", frequency: 329.628, active: false },
  { note: "F", key: "H", frequency: 349.228, active: false },
  { note: "Gb", key: "I", frequency: 369.994, active: false },
  { note: "G", key: "J", frequency: 391.995, active: false },
  { note: "Ab", key: "K", frequency: 415.305, active: false },
  { note: "A", key: "L", frequency: 440, active: false },
  { note: "Bb", key: "Q", frequency: 466.164, active: false },
  { note: "B", key: "W", frequency: 493.883, active: false },
  { note: "C2", key: "E", frequency: 523.251, active: false },
  { note: "Db2", key: "R", frequency: 554.365, active: false },
  { note: "D2", key: "T", frequency: 587.330, active: false },
  { note: "Eb2", key: "Y", frequency: 622.254, active: false },
  { note: "E2", key: "U", frequency: 659.255, active: false },
  { note: "F2", key: "I", frequency: 698.456, active: false },
  { note: "Gb2", key: "O", frequency: 739.989, active: false },
  { note: "G2", key: "P", frequency: 783.991, active: false },
  { note: "Ab2", key: "C", frequency: 830.609, active: false },
  { note: "A2", key: "V", frequency: 880, active: false },
  { note: "Bb2", key: "B", frequency: 932.328, active: false },
  { note: "B2", key: "N", frequency: 987.767, active: false },
];

document.addEventListener("keydown", (e) => {
  if (e.repeat) return;
  const keyboardKey = e.code;
  const noteDetail = getNoteDetail(keyboardKey);

  if (noteDetail == null) return;

  noteDetail.active = true;
  playNotes();
});

document.addEventListener("keyup", (e) => {
  const keyboardKey = e.code;
  const noteDetail = getNoteDetail(keyboardKey);

  if (noteDetail == null) return;

  noteDetail.active = false;
  playNotes();
});

function getNoteDetail(keyboardKey) {
  return NOTE_DETAILS.find((n) => `Key${n.key}` === keyboardKey);
}

function playNotes() {
  NOTE_DETAILS.forEach((n) => {
    const keyElement = document.querySelector(`[data-note="${n.note}"]`);
    keyElement.classList.toggle("active", n.active);
    if (n.oscillator != null) {
      n.oscillator.stop();
      n.oscillator.disconnect();
    }
  });

  const activeNotes = NOTE_DETAILS.filter((n) => n.active);
  const gain = 1 / activeNotes.length;
  activeNotes.forEach((n) => {
    startNote(n, gain);
  });
}

function startNote(noteDetail, gain) {
  const gainNode = audioContext.createGain();
  gainNode.gain.value = gain;
  const oscillator = audioContext.createOscillator();
  oscillator.frequency.value = noteDetail.frequency;
  oscillator.type = "sine";
  oscillator.connect(gainNode).connect(audioContext.destination);
  oscillator.start();
  noteDetail.oscillator = oscillator;
}
