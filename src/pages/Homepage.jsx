import exito from '../assets/images/woman-with-raised-fists.jpg';
import estres from '../assets/images/estres.jpg';
import ansiedad from '../assets/images/ansiedad.jpg';
import agotamiento from '../assets/images/agotamiento.jpg';
import atencion from '../assets/images/atencion.jpg';
import TherapySearch from '../components/TherapySearch';
import '../styles/homepage.css';  // Importar estilos específicos para la página

function HomePage() {
  return (
    <main className="homepage">
      <section className="principal-section">
        <div className="section-wrap">
          <h4>EN AURA</h4>
          <h1>Tu salud mental es nuestra prioridad</h1>
          <p>Creemos que cuidar de tu salud mental es esencial para alcanzar tu máximo potencial. Te ofrecemos herramientas y apoyo personalizado para gestionar el estrés, la ansiedad y los desafíos emocionales del día a día, permitiéndote mantener el equilibrio mientras logras tus objetivos académicos y personales.</p>
          <div className="therapy-section">
             <TherapySearch />
          </div>
        </div>

      </section>

      <section className="modules-section">
        <div className="module">
        <img src={estres} alt="Estres estudiantil" className='img-modules' />
          <h5 className="module-tag">Ejercicios</h5>
          <h3 className="module-title">Actividades para reducir el estrés durante estudios</h3>
          <a href="#" className="module-link">Inscríbete →</a>
        </div>

        <div className="module">
        <img src={atencion} alt="Atencion" className='img-modules' />
          <h5 className="module-tag">Pregunta al Experto</h5>
          <h3 className="module-title">Mejora tu bienestar mental mientras estudias mejor</h3>
          <p className="module-date">
            <i className="fas fa-broadcast-tower"></i> 17 Oct: emisión en directo
          </p>
          <a href="#" className="module-link">Más información →</a>
        </div>

        <div className="module">
        <img src={agotamiento} alt="Exito Laboral" className='img-modules' />
          <h5 className="module-tag">Consejos</h5>
          <h3 className="module-title">
          Consejos prácticos para evitar el agotamiento académico
          </h3>
          <a href="#" className="module-link">Leer más →</a>
        </div>

        <div className="module">
        <img src={ansiedad} alt="Exito Laboral" className='img-modules' />
          <h5 className="module-tag">Consejos</h5>
          <h3 className="module-title">Estrategias efectivas para manejar la ansiedad estudiantil
          </h3>
          <a href="#" className="module-link">Leer más →</a>
        </div>
      </section>
      <section className="dreams-histories-section">
      <h5 className="module-tag-dreams">Sueños</h5>
        <h2 className='dream-title'>Guarda tus sueños aquí</h2>
        <p className='dream-text'>Explora y comprende tus sueños mientras los registras en tu diario personal, a medida que vayas escribiendo, descubrirás patrones y emociones ocultas.¡Comienza hoy y observa cómo tus sueños pueden revelar más de lo que imaginas!</p>
      </section>  
    </main>
  );
}

export default HomePage;
