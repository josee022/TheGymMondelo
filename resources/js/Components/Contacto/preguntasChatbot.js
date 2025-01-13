const preguntasChatbot = [
    {
        titulo: "🏋️ Información sobre el gimnasio y servicios",
        preguntas: [
            "¿Qué tipo de instalaciones tienen?",
            "¿Qué clases ofrecen?",
            "¿Puedo reservar una clase online?",
            "¿Qué tipo de programas de entrenamiento tienen?",
            "¿Qué tipos de suscripciones ofrecen?",
        ],
    },
    {
        titulo: "💡 Consejos de salud y bienestar",
        preguntas: [
            "¿Cuáles son los beneficios del yoga?",
            "¿Qué es el entrenamiento funcional?",
            "¿Qué tipo de alimentación es recomendable para entrenar mejor?",
            "¿Los hidratos de carbono son malos?",
            "¿Cuáles son los beneficios de comer vegetales?",
        ],
    },
    {
        titulo: "🥗 Nutrición y suplementación",
        preguntas: [
            "¿Qué suplementos recomiendas para ganar músculo?",
            "¿El ayuno intermitente es recomendable?",
            "¿Cuáles son las mejores fuentes de proteínas?",
            "¿Qué grasas son saludables?",
            "¿Qué alimentos contienen antioxidantes?",
        ],
    },
    {
        titulo: "🏋️ Ejercicios y técnicas de entrenamiento",
        preguntas: [
            "¿Cuáles son los mejores ejercicios de cardio?",
            "¿Es mejor usar máquinas o peso libre?",
            "¿Cuáles son los mejores ejercicios para abdominales?",
            "¿Cuáles son los beneficios de la espirulina?",
        ],
    },
    {
        titulo: "💪 Motivación y progreso",
        preguntas: [
            "¿Cuál es la mejor manera de medir mi progreso?",
            "¿Algún consejo para no rendirme?",
            "¿Cómo puedo mejorar mi consistencia al entrenar?",
            "¿Cómo celebrar mis logros en el entrenamiento?",
        ],
    },
    {
        titulo: "🔬 Información sobre suplementos y productos",
        preguntas: [
            "¿Qué beneficios tiene la vitamina D?",
            "¿Para qué sirve la creatina?",
            "¿Qué es un pre-entrenamiento?",
            "¿Para qué sirve la glutamina?",
        ],
    },
    {
        titulo: "😴 Salud y bienestar",
        preguntas: [
            "¿Qué técnicas ayudan a reducir la ansiedad?",
            "¿Cuál es la importancia de una buena postura al entrenar?",
            "¿Qué alimentos ayudan a mejorar la digestión?",
        ],
    },
    {
        titulo: "🏋️ Ejercicio y técnicas de entrenamiento",
        preguntas: [
            "¿Qué son los ejercicios isométricos?",
            "¿Cómo funciona el entrenamiento pliométrico?",
            "¿Qué beneficios tienen los sprints?",

        ],
    },
    {
        titulo: "🆕 Consejos para principiantes",
        preguntas: [
            "¿Cómo armar una rutina para empezar?",
            "¿Cómo puedo progresar correctamente en el entrenamiento?",
            "¿Por qué es importante variar los ejercicios?",
            "¿Qué errores debo evitar al empezar?",
        ],
    },
    {
        titulo: "🔥 Motivación y apoyo",
        preguntas: [
            "¿Cómo desarrollar disciplina en el entrenamiento?",
            "¿Por qué la perseverancia es clave en el fitness?",
            "¿Cómo puedo crear hábitos saludables?",
            "¿Qué significa el éxito en el entrenamiento?",

        ],
    },
    {
        titulo: "👨‍🏫 Entrenadores y apoyo profesional",
        preguntas: [
            "¿Cuáles son los beneficios de tener un entrenador?",
            "¿Cómo el monitoreo ayuda a mejorar los resultados?",
            "¿Por qué es importante registrar el progreso?",
            "¿Cómo definir un objetivo claro en el entrenamiento?",
        ],
    },
    {
        titulo: "🏢 Información general del gimnasio y comunidad",
        preguntas: [
            "¿Qué incluyen las membresías del gimnasio?",
            "¿Cómo puedo reservar una clase?",
            "¿Dónde puedo ver el calendario de actividades?",
            "¿Puedo probar una clase gratis?",
        ],
    },
    {
        titulo: "🏆 Consejos avanzados de entrenamiento",
        preguntas: [
            "¿Cómo mejorar el rendimiento en el gimnasio?",
            "¿Qué ventajas tiene el entrenamiento de alta intensidad?",
            "¿Cómo mejorar la potencia muscular?",
            "¿Cómo calcular mis calorías diarias?",
        ],
    },
    {
        titulo: "🥗 Consejos sobre nutrición y hábitos alimenticios",
        preguntas: [
            "¿Por qué los hidratos de carbono son importantes?",
            "¿Cuál es la mejor fuente de proteínas?",
            "¿Qué importancia tiene la alimentación en el fitness?",
            "¿Cómo influye la nutrición en el rendimiento?",
        ],
    },
    {
        titulo: "💪 Otros conceptos generales y frases motivacionales",
        preguntas: [
            "¿Por qué la fuerza es importante en el entrenamiento?",
            "¿Qué significa la resiliencia en el fitness?",
            "¿Por qué la constancia es clave en el progreso?",
            "¿Por qué es importante aprender sobre tu cuerpo?",
        ],
    },
    {
        titulo: "🧪 Nutrición avanzada y suplementos",
        preguntas: [
            "¿Qué función tienen los electrolitos en el cuerpo?",
            "¿Cómo ayuda el calcio en el entrenamiento?",
            "¿Qué beneficios tiene el zinc?",
            "¿Para qué sirve la vitamina C?",
            "¿Cómo ayuda el omega-3 en el rendimiento deportivo?",
        ],
    },
    {
        titulo: "🏋️ Entrenamiento funcional y variaciones de ejercicios",
        preguntas: [
            "¿Por qué la movilidad es clave para evitar lesiones?",
            "¿Qué beneficios tienen las flexiones?",
            "¿Cómo mejorar la explosividad con saltos?",
            "¿Cómo hacer correctamente el ejercicio escalador?",
            "¿Qué ejercicios de tirón son recomendables?",
        ],
    },
    {
        titulo: "🔄 Entrenamiento en circuitos y métodos avanzados",
        preguntas: [
            "¿Qué es una superserie y cómo hacerla?",
            "¿Cómo funciona una triserie en el gimnasio?",
            "¿Qué es el descanso activo y cómo implementarlo?",
            "¿Cómo calcular el volumen de entrenamiento?",
        ],
    },
    {
        titulo: "🎯 Consejos de entrenamiento para objetivos específicos",
        preguntas: [
            "¿Cómo marcar los músculos de forma efectiva?",
            "¿Cómo aumentar el crecimiento muscular?",
            "¿Cómo lograr una mejor tonificación?",
            "¿Qué es la hipertrofia y cómo entrenarla?",
        ],
    },
    {
        titulo: "🧠 Consejos de salud mental y motivación",
        preguntas: [
            "¿Cómo mejorar la confianza en uno mismo?",
            "¿Qué impacto tiene el ejercicio en la autoestima?",
            "¿Cómo mantener una mentalidad positiva?",
            "¿Cómo crear hábitos positivos en la vida diaria?",
        ],
    },
    {
        titulo: "🛌 Consejos de recuperación y autocuidado",
        preguntas: [
            "¿Por qué la hidratación es clave para el rendimiento?",
            "¿Cómo aliviar el dolor muscular después del entrenamiento?",
            "¿Qué es la recuperación activa?",
            "¿Qué beneficios tiene el masaje en la recuperación?",
        ],
    },
    {
        titulo: "👥 Tips para entrenar en grupo y comunidad",
        preguntas: [
            "¿Cuáles son los beneficios de entrenar con compañeros?",
            "¿Cómo ayuda la motivación grupal en el progreso?",
            "¿Por qué es importante tener una red de apoyo en el gimnasio?",
            "¿Cómo participar en los retos del gimnasio?",
        ],
    },
];

export default preguntasChatbot;
