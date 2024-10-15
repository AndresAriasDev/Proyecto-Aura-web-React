
import { useEffect, useState } from 'react';

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = SpeechRecognition ? new SpeechRecognition() : null;
const assistantID = 'asst_svKKYrc6mHpfZx0pkVNqqMmB';  // ID del asistente actual


function VoiceAssistant() {
  const [response, setResponse] = useState('');  // Respuesta del bot
  const [listening, setListening] = useState(false);

  useEffect(() => {
    if (!recognition) {
      console.error('Este navegador no soporta reconocimiento de voz');
      return;
    }

    recognition.continuous = true;
    recognition.interimResults = false;
    recognition.lang = 'es-ES';

    recognition.onstart = () => {
      console.log('Asistente escuchando...');
      setResponse('Estoy escuchando...');
    };

    recognition.onresult = async (event) => {
      const transcript = event.results[event.results.length - 1][0].transcript.toLowerCase();
      console.log('Texto reconocido:', transcript);
      const respuestaBot = await fetchResponseFromAPI(transcript);  // Llamada a la API
      setResponse(respuestaBot);
      speakText(respuestaBot);  // Leer la respuesta en voz alta
    };

    recognition.onerror = (event) => {
      console.error('Error en el reconocimiento:', event.error);
      setResponse('Hubo un error al escuchar. Inténtalo de nuevo.');
    };

    recognition.onend = () => {
      console.log('Reconocimiento finalizado, esperando nueva activación.');
      setListening(false);  // Desactivar el modo de escucha
    };
  }, []);

  const startListening = () => {
    recognition.start();  // Iniciar el reconocimiento de voz
    setListening(true);
  };

  const stopListening = () => {
    recognition.stop();  // Detener el reconocimiento de voz
    setListening(false);
  };

  const speakText = (text) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'es-ES'; // Configuración del idioma
  
    // Detenemos la escucha mientras habla
    recognition.stop();
  
    const setVoice = () => {
      const voices = window.speechSynthesis.getVoices();
      let femaleVoice = voices.find((voice) =>
        (voice.lang.startsWith('es') || voice.lang === 'es-419') &&
        (voice.name.toLowerCase().includes('female') || 
         voice.name.toLowerCase().includes('carmen') || 
         voice.name.toLowerCase().includes('lucia'))
      );
  
      femaleVoice = femaleVoice || voices.find((voice) => voice.lang.startsWith('es'));
      utterance.voice = femaleVoice || voices[0];
      speechSynthesis.speak(utterance);
    };
  
    // Reactivar reconocimiento de voz al terminar de hablar
    utterance.onend = () => {
      console.log('Asistente terminó de hablar.');
      recognition.start(); // Volvemos a activar la escucha
    };
  
    if (window.speechSynthesis.getVoices().length === 0) {
      window.speechSynthesis.onvoiceschanged = setVoice;
    } else {
      setVoice();
    }
  };
  
  
  const fetchResponseFromAPI = async (message) => {
    try {

        const response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`,  // Usando la variable de entorno
            },
            body: JSON.stringify({
                model: 'gpt-4o-mini',
                messages: [
                  { role: 'system', content: `Asistente ID: ${assistantID} | Eres un asistente emocional...` },
                  { role: 'user', content: message },
                ],
                max_tokens: 80,
            }),
        });
        if (response.status === 429) {
          return 'Has realizado demasiadas solicitudes. Por favor, espera unos minutos e inténtalo de nuevo.';
      }
      

        if (!response.ok) {
            throw new Error(`Error: ${response.status} - ${response.statusText}`);
        }

        const data = await response.json();
        return data.choices[0].message.content.trim();
    } catch (error) {
        console.error('Error al obtener respuesta de la API:', error);
        return 'Lo siento, hubo un problema al obtener la respuesta.';
    }
};

  return (
    <div className="voice-assistant">
      <p>{response}</p>
      {listening ? <p>🔊 Escuchando...</p> : <button onClick={startListening}>Presiona para activar el micrófono</button>}
      {listening && <button onClick={stopListening}>Detener escucha</button>}
    </div>
  );
}

export default VoiceAssistant;
