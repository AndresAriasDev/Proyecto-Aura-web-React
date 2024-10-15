import { useEffect, useState, useRef } from 'react';

function VoiceAssistant() {
  const recognitionRef = useRef(null);
  const [isListening, setIsListening] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (!('webkitSpeechRecognition' in window)) {
      console.error('Speech Recognition API no es compatible con este navegador.');
      return;
    }

    const SpeechRecognition = window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognitionRef.current = recognition;

    recognition.continuous = true;
    recognition.interimResults = false;
    recognition.lang = 'es-ES';

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript.trim();
      console.log('Texto detectado:', transcript);
      handleVoiceCommand(transcript);
    };

    recognition.onerror = (event) => {
      console.error('Error en SpeechRecognition:', event.error);
    };

    // Limpieza para detener el reconocimiento de voz al desmontar el componente
    return () => {
      recognition.stop();
    };
  }, []);

  const toggleListening = () => {
    if (isListening) {
      recognitionRef.current.stop();
    } else {
      recognitionRef.current.start();
    }
    setIsListening(!isListening);
  };

  const handleVoiceCommand = async (command) => {
    console.log('Comando:', command);

    let responseMessage = '';

    if (command.toLowerCase().includes('ansiedad')) {
      responseMessage = 'Puedes manejar la ansiedad con respiración profunda y ejercicio.';
    } else {
      responseMessage = 'Lo siento, no tengo una respuesta para eso.';
    }

    setMessage(responseMessage);
    speakMessage(responseMessage); // Llamar a la función para hablar
  };

  const speakMessage = (text) => {
    const speech = new SpeechSynthesisUtterance(text); // Crear instancia de síntesis de voz
    speech.lang = 'es-ES'; // Establecer el idioma
    speechSynthesis.speak(speech); // Ejecutar la síntesis de voz
  };

  return (
    <div>
      <button onClick={toggleListening}>
        {isListening ? 'Detener' : 'Hablar'}
      </button>
      <p>{message}</p>
    </div>
  );
}

export default VoiceAssistant;
