import { useEffect, useState } from 'react';
import '../styles/VoiceAssistant.css';

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = SpeechRecognition ? new SpeechRecognition() : null;
const assistantID = 'asst_svKKYrc6mHpfZx0pkVNqqMmB';  // ID del asistente actual

function VoiceAssistant() {
  const [response, setResponse] = useState('');
  const [listening, setListening] = useState(false);
  console.log(window.speechSynthesis.getVoices());

  useEffect(() => {
    if (!recognition) {
      console.error('Este navegador no soporta reconocimiento de voz');
      return;
    }

    recognition.continuous = false; // Cambiado para evitar bucles
    recognition.interimResults = false;
    recognition.lang = 'es-US';

    recognition.onstart = () => {
      console.log('Asistente escuchando...');
      setResponse('Estoy escuchando...');
    };

    recognition.onresult = async (event) => {
      const transcript = event.results[0][0].transcript.toLowerCase();
      console.log('Texto reconocido:', transcript);
      const respuestaBot = await fetchResponseFromAPI(transcript);  // Llamada a la API
      setResponse(respuestaBot);
      speakText(respuestaBot);  // Leer la respuesta en voz alta
      stopListening();  // Detener la escucha después de responder
    };

    recognition.onerror = (event) => {
      console.error('Error en el reconocimiento:', event.error);
      setResponse('Hubo un error al escuchar. Inténtalo de nuevo.');
    };

    recognition.onend = () => {
      console.log('Reconocimiento finalizado.');
      setListening(false);  // Actualiza el estado de escucha
    };
  }, []);

  const startListening = () => {
    recognition.start();  // Inicia el reconocimiento de voz
    setListening(true);
  };

  const stopListening = () => {
    recognition.stop();  // Detiene el reconocimiento de voz
    setListening(false);
  };

  const speakText = (text) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'es-ES'; // Configuración del idioma

    // Función para establecer la voz
    const setVoice = () => {
      const voices = window.speechSynthesis.getVoices();
      let femaleVoice = voices.find(
        (voice) =>
          (voice.lang.startsWith('es') || voice.lang === 'es-419') &&
          (voice.name.toLowerCase().includes('female') || voice.name.toLowerCase().includes('zira') || voice.name.toLowerCase().includes('paula'))  // Ajusta para otros nombres posibles
      );
      
      // Si no encuentra una voz femenina específica, selecciona cualquier voz en español
      femaleVoice = femaleVoice || voices.find((voice) => voice.lang.startsWith('es'));
      utterance.voice = femaleVoice || voices[0];
      speechSynthesis.speak(utterance);
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
          'Authorization': `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`,
        },
        body: JSON.stringify({
          model: 'gpt-3.5-turbo',
          messages: [
            { role: 'system', content: `Asistente ID: ${assistantID} | Responde solo preguntas relacionadas con salud mental y bienestar emocional. Si recibes una pregunta fuera de estos temas, responde que no estás capacitado para responder preguntas sobre otros temas.` },
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
      {listening ? (
        <button onClick={stopListening} className='btn-chatbot'>Detener escucha</button>
      ) : (
        <button onClick={startListening} className='btn-chatbot'>Presiona para activar el micrófono</button>
      )}
    </div>
  );
}

export default VoiceAssistant;
