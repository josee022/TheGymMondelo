<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class ChatbotController extends Controller
{
    public function getResponse(Request $request)
    {
        // Pasar cadena a minúscula
        $question = strtolower($request->input('question'));

        $responses = [
            // Mensajes generales y frases de cortesía
            'hola' => "¡Hola! ¿En qué puedo ayudarte hoy?",
            'adiós' => "Hasta luego, ¡sigue motivado!",
            'gracias' => "¡De nada! Estoy aquí para ayudarte 😊",
            'por' => "Claro, siempre a tu servicio.",
            'buenos' => "¡Buenos días! Espero que tengas un día lleno de energía.",
            'tardes' => "¡Buenas tardes! Espero que estés teniendo un excelente día de entrenamiento.",
            'noches' => "Buenas noches, ¡descansa bien!",
            'cómo' => "Soy solo un chatbot, ¡pero gracias por preguntar!",
            'hasta' => "¡Cuídate! Vuelve cuando necesites más ayuda.",
            'encantado' => "¡Encantado de ayudarte! ¿Qué necesitas?",
            'disculpa' => "No te preocupes, ¡todo está bien!",
            'genial' => "¡Me alegra que te guste! 😄",
            'útil' => "¡Gracias! Estoy aquí para ayudarte en lo que necesites.",
            'robot' => "Sí, soy un chatbot diseñado para ayudarte con temas de salud y gimnasio.",
            'gimnasio' => "¡Me encanta ayudar a las personas a alcanzar sus metas!",
            'próxima' => "¡Hasta la próxima! Vuelve cuando necesites ayuda.",
            'siento' => "No hay problema, estoy aquí para ayudarte.",

            // Información sobre el gimnasio y clases
            'ubicación' => "Nos encontramos en el centro de la ciudad, cerca de la plaza principal.",
            'teléfono' => "Nuestro número es 555-0123. ¡Llámanos si tienes más preguntas!",
            'instalaciones' => "Contamos con áreas de cardio, pesas, crossfit y una zona de relajación.",
            'clases' => "Ofrecemos yoga, pilates, entrenamiento funcional y spinning. ¿Te interesa algún horario en específico?",
            'horarios' => "Nuestros horarios varían entre semana y fines de semana. ¿Quieres saber los horarios de alguna clase en particular?",
            'programas' => "Tenemos programas de fuerza, resistencia, y tonificación. ¿Te gustaría conocer más detalles?",
            'nuevas' => "Pronto añadiremos clases de spinning y una zona de boxeo.",
            'suscripciones' => "Las suscripciones pueden ser mensuales, trimestrales y anuales. Todas incluyen acceso a nuestras instalaciones y clases.",
            'dietas' => "Ofrecemos dietas personalizadas según tus metas. Consulta a nuestros entrenadores o nutricionistas.",
            'entrenadores' => "Nuestros entrenadores son expertos en diversas áreas, como musculación, yoga y nutrición.",
            'eventos' => "Realizamos eventos mensuales para nuestros miembros. ¡Esté atento a las novedades!",

            // Funcionalidades de la plataforma
            'perfil' => "En tu perfil puedes actualizar tus datos, ver tu progreso y tus reservas.",
            'reservas' => "Para reservar una clase, ve a la sección de 'Reservas' en tu perfil.",
            'contacto' => "Puedes contactarnos en nuestra sección de 'Contacto'. Estamos para ayudarte.",
            'mensajes' => "Respondemos a los mensajes de contacto en menos de 24 horas.",
            'diario' => "En el diario puedes registrar tus entrenamientos y ver tus progresos diarios.",
            'foro' => "En el foro puedes compartir experiencias, hacer preguntas y recibir consejos de otros miembros.",
            'blog' => "Nuestro blog es actualizado por nuestros entrenadores. Encontrarás artículos sobre entrenamiento, dieta y salud.",
            'tienda' => "En la tienda puedes comprar productos como suplementos, ropa deportiva y equipo de entrenamiento.",

            // Consejos de salud y bienestar
            'yoga' => "El yoga mejora la flexibilidad, reduce el estrés y aumenta la concentración.",
            'funcional' => "El entrenamiento funcional mejora la fuerza y resistencia para las actividades diarias.",
            'lesiones' => "Haz un buen calentamiento, usa la técnica correcta y escucha a tu cuerpo.",
            'frecuencia' => "Lo ideal es hacer ejercicio 3-5 veces por semana para ver buenos resultados.",
            'sedentarismo' => "Intenta caminar al menos 10,000 pasos al día y toma pausas activas si trabajas sentado.",
            'alimentación' => "Una alimentación saludable incluye proteínas, carbohidratos complejos, grasas saludables y mucha agua.",
            'hidratos' => "Los carbohidratos te brindan energía para rendir bien en el ejercicio. ¡No los elimines!",
            'vegetales' => "Los vegetales son ricos en nutrientes y antioxidantes, ¡inclúyelos en cada comida!",
            'descanso' => "Recuerda que el descanso es fundamental para la recuperación muscular. ¡Duerme al menos 7-8 horas!",

            // Nutrición y suplementación
            'suplementos' => "La proteína, creatina y BCAAs son comunes, pero consulta siempre con un profesional.",
            'post' => "Las proteínas y carbohidratos son ideales después de entrenar para la recuperación.",
            'ayuno' => "Es una estrategia popular, pero consulta con un nutricionista si estás considerando probarla.",
            'proteínas' => "Las proteínas son esenciales para la recuperación muscular. Buenas fuentes incluyen pollo, pescado y legumbres.",
            'carbohidratos' => "Los carbohidratos son la fuente principal de energía. Prefiere opciones integrales.",
            'grasas' => "Las grasas saludables como el aguacate y las nueces son importantes para el cuerpo. ¡No las evites!",

            // Ejercicios y técnicas
            'calentamiento' => "Un buen calentamiento reduce el riesgo de lesiones. Dedica al menos 10 minutos antes de entrenar.",
            'flexibilidad' => "La flexibilidad mejora con estiramientos constantes. Intenta el yoga o el pilates.",
            'fuerza' => "El entrenamiento de fuerza aumenta tu músculo y resistencia. ¿Te interesa una rutina personalizada?",
            'cardio' => "El cardio es excelente para el sistema cardiovascular. Tienes opciones como correr, nadar o bici.",
            'hiit' => "El HIIT quema calorías rápidamente y mejora la resistencia. Perfecto si tienes poco tiempo.",
            'peso' => "Los pesos libres ayudan a trabajar músculos estabilizadores. ¿Quieres algunos ejercicios?",
            'espalda' => "Las dominadas y el remo con barra son excelentes para fortalecer la espalda.",
            'abdominales' => "Para trabajar el abdomen, prueba crunches, planchas y elevación de piernas.",

            // Rasgos físicos y objetivos comunes
            'tonificar' => "Para tonificar, combina pesas y cardio, y cuida tu dieta.",
            'perder' => "Para perder peso, mantén un déficit calórico y haz ejercicios de fuerza y cardio.",
            'músculo' => "Para ganar músculo, incluye proteínas en tu dieta y realiza ejercicios de fuerza.",
            'resistencia' => "La resistencia se mejora con ejercicios aeróbicos regulares y progresivos.",
            'postura' => "El yoga y ejercicios de core te ayudan a mejorar la postura corporal.",
            'bajar' => "Para bajar de peso, combina ejercicio de resistencia con una dieta en déficit calórico.",

            // Motivación y frases para animar
            'motivación' => "¡Tú puedes! Cada esfuerzo cuenta y los resultados llegarán si eres constante.",
            'metas' => "Establece metas pequeñas y celebra cada avance. ¡Estás en el camino correcto!",
            'progreso' => "Puedes medir tu progreso con fotos, peso corporal y tus registros en el diario de entrenamiento.",
            'ánimo' => "¡Vamos, tú puedes! Cada paso te acerca más a tu meta.",
            'consistencia' => "La consistencia es clave. ¡No te rindas!",
            'logros' => "Establece metas alcanzables y celebra cada logro.",

            // Alimentación y bienestar general
            'antioxidantes' => "Los antioxidantes ayudan a proteger el cuerpo del daño celular. Los encuentras en frutas y verduras.",
            'fibra' => "La fibra ayuda a la digestión y mantiene el azúcar en sangre estable. La encuentras en frutas, verduras y granos.",
            'saturadas' => "Las grasas insaturadas son saludables, mientras que las saturadas deben consumirse en menor cantidad.",
            'colesterol' => "Es una sustancia en el cuerpo necesaria para funciones celulares, pero en exceso puede causar problemas de salud.",
            'minerales' => "Son nutrientes necesarios para el cuerpo, como el calcio, hierro y magnesio, que ayudan en diversas funciones.",

            // Suplementos y productos
            'vitamina' => "La vitamina D es importante para la salud ósea y ayuda a la absorción de calcio.",
            'creatina' => "La creatina es ideal para mejorar la fuerza y el rendimiento en entrenamientos intensos.",
            'pre-entrenamiento' => "El pre-entrenamiento es un suplemento para mejorar la energía y resistencia durante el ejercicio.",
            'bcaa' => "Los BCAAs ayudan en la recuperación muscular y se toman antes, durante o después del entrenamiento.",
            'espirulina' => "La espirulina es rica en antioxidantes, proteínas y vitaminas. Ayuda en la energía y recuperación.",
            'glutamina' => "La glutamina ayuda en la recuperación muscular y fortalece el sistema inmune.",
            'cafeína' => "La cafeína aumenta la energía y el enfoque, siendo popular como pre-entrenamiento.",

            // Salud y bienestar
            'sueño' => "Dormir bien es fundamental para la recuperación y rendimiento físico.",
            'ansiedad' => "El ejercicio, respiración profunda y técnicas de relajación son efectivos para reducir la ansiedad.",
            'estrés' => "El ejercicio, una buena organización y respiración ayudan a controlar el estrés.",
            'respiración' => "La respiración adecuada puede mejorar el rendimiento y reducir la fatiga durante el entrenamiento.",
            'postura' => "Mantener una buena postura reduce el riesgo de lesiones y mejora la eficiencia de los movimientos.",
            'digestión' => "Para mejorar la digestión, consume fibra, bebe agua y evita alimentos muy procesados.",

            // Ejercicio y técnicas de entrenamiento
            'pesas' => "Entrenar con pesas aumenta la fuerza muscular y mejora la composición corporal.",
            'isométrico' => "Los ejercicios isométricos, como la plancha, fortalecen los músculos sin movimiento.",
            'pliométrico' => "El entrenamiento pliométrico consiste en saltos y movimientos explosivos para ganar potencia.",
            'sprint' => "Los sprints mejoran la velocidad y son una excelente forma de hacer cardio de alta intensidad.",
            'core' => "Un core fuerte es esencial para la estabilidad y mejora el rendimiento en casi todos los ejercicios.",
            'balance' => "El equilibrio y balance son importantes para la estabilidad y la prevención de lesiones.",

            // Consejos para principiantes
            'rutina' => "Para empezar, sigue una rutina básica y consulta a un entrenador para evitar lesiones.",
            'intimidado' => "Es normal al principio. Enfócate en tus metas y recuerda que todos empiezan desde algún lugar.",
            'progresión' => "La progresión es importante en el entrenamiento; aumenta la intensidad gradualmente.",
            'variación' => "La variación de ejercicios es importante para evitar el estancamiento y mejorar en distintas áreas.",
            'supervisión' => "Para ejercicios avanzados, es recomendable entrenar con supervisión para aprender la técnica correcta.",
            'errores' => "Aprende de tus errores, ajusta tu rutina y sigue adelante. La constancia es clave.",

            // Motivación y apoyo
            'disciplina' => "La disciplina es clave para alcanzar tus metas a largo plazo. ¡No te rindas!",
            'perseverancia' => "La perseverancia es la clave del éxito en el fitness. ¡Cada paso cuenta!",
            'hábitos' => "Crear hábitos saludables es más importante que una dieta o rutina perfecta.",
            'éxito' => "El éxito es la suma de pequeñas acciones hechas de forma consistente.",
            'paciencia' => "La paciencia es clave en el fitness. Los grandes cambios toman tiempo.",
            'visualización' => "Visualiza tus metas y trabaja constantemente hacia ellas. ¡Puedes lograrlo!",

            // Entrenadores y apoyo profesional
            'entrenador' => "Un entrenador puede ayudarte a optimizar tu tiempo y alcanzar tus objetivos de forma segura.",
            'planificación' => "La planificación es fundamental para ver resultados a largo plazo. Un entrenador puede ayudarte.",
            'personalizado' => "Para resultados óptimos, un plan personalizado es ideal para adaptarse a tus necesidades.",
            'monitoreo' => "El monitoreo continuo ayuda a ajustar y mejorar tu programa de entrenamiento.",
            'progreso' => "Registrar tu progreso te ayuda a mantenerte motivado y a ajustar tu plan según tus resultados.",
            'objetivo' => "Tener un objetivo claro es esencial. Un entrenador puede ayudarte a definir tus metas.",

            // Información general del gimnasio y comunidad
            'membresía' => "Nuestras membresías incluyen acceso completo a las instalaciones y clases grupales.",
            'reserva' => "Puedes reservar tus clases directamente desde nuestro sistema de reservas en línea.",
            'evento' => "Ofrecemos eventos especiales cada mes para los miembros del gimnasio. ¡Participa y conoce gente nueva!",
            'grupo' => "Entrenar en grupo es motivador y permite crear un sentido de comunidad.",
            'calendario' => "Consulta el calendario de actividades para ver las próximas clases y eventos.",
            'prueba' => "Si quieres probar el gimnasio, contáctanos para organizar una clase de prueba gratuita.",

            // Consejos avanzados de entrenamiento
            'rendimiento' => "Para mejorar el rendimiento, enfócate en la técnica, progresión y descanso adecuado.",
            'intensidad' => "El entrenamiento de alta intensidad quema más calorías en menos tiempo. Ideal si tienes poco tiempo.",
            'potencia' => "La potencia se entrena con movimientos explosivos y pliométricos.",
            'técnica' => "Una buena técnica es clave para evitar lesiones y sacar el máximo provecho de cada ejercicio.",
            'intervalo' => "El entrenamiento por intervalos es una forma efectiva de mejorar la resistencia y quema de calorías.",
            'calorías' => "Calcular tus calorías te ayuda a controlar mejor tu progreso según tus metas de peso o músculo.",

            // Consejos sobre nutrición y hábitos alimenticios
            'hidratos' => "Los hidratos de carbono son esenciales para la energía en el entrenamiento. Prefiere opciones integrales.",
            'proteína' => "La proteína es importante para la recuperación muscular. Incorpora una fuente de proteína en cada comida.",
            'almuerzo' => "Un almuerzo balanceado ayuda a mantener los niveles de energía durante el día.",
            'merienda' => "Las meriendas saludables pueden mantener tu energía sin añadir muchas calorías.",
            'comida' => "Comer bien es tan importante como el ejercicio para alcanzar tus metas de fitness.",
            'nutrición' => "Una buena nutrición complementa el entrenamiento y ayuda a lograr resultados más efectivos.",

            // Otros conceptos generales y frases motivacionales
            'fuerza' => "Construir fuerza lleva tiempo y constancia, pero los resultados valen la pena.",
            'resiliencia' => "La resiliencia te ayuda a superar los desafíos y a seguir adelante en tus metas de fitness.",
            'constancia' => "La constancia es el pilar del éxito. Cada día cuenta.",
            'salud' => "La salud física y mental son igualmente importantes para un estilo de vida equilibrado.",
            'crecimiento' => "El crecimiento personal es una parte esencial del proceso en el fitness y en la vida.",
            'aprendizaje' => "Cada entrenamiento es una oportunidad para aprender algo nuevo sobre ti mismo.",

            // Nutrición avanzada y suplementos
            'electrolitos' => "Los electrolitos, como el sodio y potasio, son esenciales para la hidratación y el rendimiento en el ejercicio.",
            'hierro' => "El hierro es crucial para transportar oxígeno en la sangre. Buenas fuentes incluyen carnes magras y espinacas.",
            'calcio' => "El calcio es esencial para los huesos y la contracción muscular. Lo encuentras en lácteos, almendras y tofu.",
            'zinc' => "El zinc apoya el sistema inmune y la recuperación muscular. Alimentos ricos en zinc incluyen carnes, nueces y semillas.",
            'vitamina c' => "La vitamina C es antioxidante y ayuda a la recuperación. Está en frutas como naranjas, fresas y kiwi.",
            'omega' => "El omega-3 reduce la inflamación y apoya la salud del corazón. Está en pescados grasos y semillas de lino.",
            'antioxidantes' => "Los antioxidantes protegen las células del daño. Los encuentras en frutas y verduras de colores vivos.",

            // Entrenamiento funcional y variaciones de ejercicios
            'movilidad' => "Trabajar la movilidad te ayuda a mejorar el rango de movimiento y prevenir lesiones.",
            'flexión' => "Las flexiones son un gran ejercicio para el pecho, los hombros y los tríceps.",
            'saltar' => "El salto mejora la potencia y la explosividad, además de trabajar el core y las piernas.",
            'escalador' => "El escalador es un ejercicio que fortalece el core y aumenta la resistencia cardiovascular.",
            'tirón' => "Los ejercicios de tirón, como el remo, son esenciales para trabajar la espalda y los bíceps.",
            'pesas rusas' => "Las pesas rusas permiten ejercicios dinámicos para fuerza y resistencia. Son excelentes para el core y las piernas.",
            'silla romana' => "La silla romana es excelente para trabajar el core y fortalecer la zona lumbar y los abdominales.",

            // Entrenamiento en circuitos y métodos avanzados
            'superserie' => "Una superserie combina dos ejercicios sin descanso entre ellos, aumentando la intensidad del entrenamiento.",
            'triserie' => "La triserie consiste en realizar tres ejercicios seguidos, lo cual maximiza el esfuerzo en un grupo muscular.",
            'descanso activo' => "El descanso activo mantiene el cuerpo en movimiento entre ejercicios, ayudando a la recuperación sin detenerse.",
            'volumen' => "El volumen de entrenamiento se refiere al total de repeticiones y series. Un volumen adecuado es clave para progresar.",
            'contracción' => "Mantener la contracción durante un ejercicio puede maximizar el trabajo en el músculo.",
            'periodización' => "La periodización es un plan estructurado que organiza el entrenamiento en fases para mejorar en distintas áreas.",

            // Consejos de entrenamiento para objetivos específicos
            'marcación' => "Para marcar músculo, combina ejercicios de resistencia y una dieta con déficit calórico moderado.",
            'crecimiento' => "El crecimiento muscular requiere un superávit calórico y entrenamiento de fuerza constante.",
            'tonificación' => "La tonificación se logra con ejercicios de fuerza y una dieta que apoye la pérdida de grasa.",
            'hipertrofia' => "La hipertrofia es el aumento del tamaño muscular y se logra con entrenamientos intensos y dieta adecuada.",
            'resistencia aeróbica' => "La resistencia aeróbica mejora con ejercicios cardiovasculares como correr, nadar o montar en bici.",
            'definición' => "Para definir, prioriza una dieta equilibrada y entrenamientos de alta intensidad para reducir grasa corporal.",

            // Consejos de salud mental y motivación
            'confianza' => "La confianza en ti mismo aumenta al ver progresos y superar tus propios límites. ¡Sigue avanzando!",
            'autoestima' => "El ejercicio regular es una gran forma de mejorar la autoestima y sentirse mejor en general.",
            'mentalidad' => "Una mentalidad positiva es clave. Enfócate en tus logros y en el progreso que has alcanzado.",
            'hábitos positivos' => "Incorporar hábitos positivos en tu vida diaria te llevará a un cambio a largo plazo.",
            'motivación interna' => "La motivación interna, o hacer ejercicio por gusto y bienestar, es la más sostenible.",
            'rendimiento mental' => "El ejercicio también mejora el rendimiento mental, la concentración y el estado de ánimo.",

            // Consejos de recuperación y autocuidado
            'hidratación' => "Mantenerse hidratado es crucial para el rendimiento y la recuperación muscular.",
            'dolor muscular' => "El dolor muscular después del ejercicio es común. Descansar y estirar ayuda a reducirlo.",
            'recuperación activa' => "La recuperación activa implica movimientos ligeros que ayudan a reducir la rigidez y a mejorar la circulación.",
            'masaje' => "Los masajes mejoran la recuperación muscular y ayudan a aliviar la tensión acumulada.",
            'sueño reparador' => "Un sueño reparador ayuda en la recuperación y en el crecimiento muscular.",
            'pausas' => "Tomar pausas regulares durante el entrenamiento evita la fatiga excesiva y mantiene el rendimiento alto.",

            // Tips para entrenar en grupo y comunidad
            'compañeros' => "Entrenar con compañeros aumenta la motivación y te ayuda a mantenerte constante.",
            'motivación grupal' => "La motivación grupal es un gran apoyo para mantener el esfuerzo en los entrenamientos.",
            'red' => "Una red de apoyo en el gimnasio te anima a alcanzar tus metas y a compartir experiencias.",
            'retos' => "Participar en retos del gimnasio es una excelente forma de mantenerte comprometido y motivado.",
            'aprendizaje' => "Entrenar con otros también es una oportunidad de aprendizaje, intercambiando consejos y técnicas.",
            'comunidad' => "La comunidad del gimnasio ofrece un entorno de apoyo y motivación para todos.",

            // Mensajes agradables y motivadores para usuarios
            'avanzar' => "¡Cada paso cuenta! Sigue avanzando y no mires atrás.",
            'pequeños logros' => "Celebra cada pequeño logro; todos forman parte del camino.",
            'camino' => "El camino hacia el éxito está lleno de retos, pero también de recompensas.",
            'esfuerzo' => "Todo esfuerzo tiene su recompensa. Sigue así, ¡lo estás haciendo genial!",
            'creer' => "Cree en ti mismo y en tu capacidad para lograr lo que te propongas.",
            'transformación' => "La transformación es un proceso; cada día que entrenas, estás más cerca de tus objetivos.",
            'lograr' => "Tienes todo lo que necesitas para lograrlo. Solo sigue trabajando cada día.",

            // Información adicional sobre el gimnasio
            'horario' => "Nuestro gimnasio está abierto de 6 a.m. a 10 p.m. entre semana, y los sábados de 8 a.m. a 8 p.m.",
            'instalación' => "Nuestras instalaciones están equipadas con equipos modernos para cardio, fuerza y crossfit.",
            'personal' => "Contamos con un equipo de entrenadores certificados para guiarte en tu entrenamiento.",
            'zona de pesas' => "La zona de pesas cuenta con mancuernas, barras y todo lo necesario para tu entrenamiento de fuerza.",
            'área de cardio' => "En nuestra área de cardio, encontrarás cintas de correr, bicicletas y elípticas.",
            'espacio' => "Nuestro gimnasio tiene espacios amplios para que entrenes cómodamente y sin aglomeraciones.",

            // Ejercicios para la parte superior del cuerpo
            'press de banca' => "El press de banca es excelente para trabajar el pecho, los tríceps y los hombros.",
            'dominadas' => "Las dominadas son ideales para fortalecer la espalda y los bíceps. Usa tu peso corporal o un lastre si buscas más intensidad.",
            'fondos' => "Los fondos en barras paralelas trabajan intensamente los tríceps y el pecho. Úsalos para ganar fuerza en la parte superior.",
            'remo con barra' => "El remo con barra es un ejercicio fundamental para la espalda, especialmente para la parte media.",
            'pull over' => "El pull over con mancuerna o barra ayuda a expandir el pecho y fortalece el serrato anterior.",
            'elevaciones laterales' => "Las elevaciones laterales trabajan los deltoides laterales, definiendo y ampliando los hombros.",
            'curl de bíceps' => "El curl de bíceps es un ejercicio clásico para aumentar la fuerza y tamaño de los bíceps.",
            'press militar' => "El press militar es excelente para desarrollar los hombros y el trapecio.",
            'triceps en polea' => "El tríceps en polea permite aislar y fortalecer este músculo, mejorando la definición del brazo.",
            'face pull' => "El face pull con cuerda es ideal para los deltoides posteriores y mejorar la postura de los hombros.",

            // Ejercicios para la parte inferior del cuerpo
            'sentadilla' => "La sentadilla es el ejercicio rey para las piernas, trabajando glúteos, cuádriceps y core.",
            'peso muerto' => "El peso muerto es fundamental para el desarrollo de la fuerza en la cadena posterior: espalda baja, glúteos y femorales.",
            'zancadas' => "Las zancadas son un gran ejercicio para trabajar glúteos, cuádriceps y mejorar el equilibrio.",
            'prensa' => "La prensa de piernas permite trabajar cuádriceps, glúteos y femorales sin cargar la espalda.",
            'elevación de talones' => "Las elevaciones de talones fortalecen los músculos de la pantorrilla, mejorando el equilibrio y la estabilidad.",
            'puente de glúteos' => "El puente de glúteos activa y fortalece los glúteos y el core. Úsalo como calentamiento o ejercicio principal.",
            'sentadilla búlgara' => "La sentadilla búlgara trabaja unilateralmente los cuádriceps y glúteos, aumentando la estabilidad de la cadera.",
            'femorales en máquina' => "La máquina de femorales aísla los isquiotibiales y ayuda a mejorar la fuerza en la parte posterior del muslo.",
            'extensión de piernas' => "La extensión de piernas aísla el cuádriceps, ideal para aumentar la fuerza y definición de la parte frontal del muslo.",
            'abducción de cadera' => "La abducción de cadera trabaja los glúteos medios y ayuda a la estabilidad de la cadera y la pelvis.",

            // Ejercicios para el core
            'plancha' => "El plank o plancha es un excelente ejercicio para fortalecer el core y mejorar la postura.",
            'crunch' => "El crunch abdominal es un ejercicio básico que trabaja la parte superior del abdomen.",
            'bicicleta' => "El ejercicio de bicicleta en el suelo activa el abdomen, especialmente los oblicuos.",
            'elevación de piernas' => "La elevación de piernas es ideal para la parte baja del abdomen y mejorar la fuerza del core.",
            'twist ruso' => "El twist ruso trabaja los oblicuos y mejora la rotación y estabilidad del core.",
            'mountain climbers' => "Los mountain climbers son un ejercicio cardiovascular que fortalece el core y mejora la agilidad.",
            'rueda' => "El ab wheel o rueda abdominal trabaja todo el core de forma intensa, ideal para avanzados.",
            'hanging leg raises' => "Las elevaciones de piernas colgado son un gran ejercicio para el core y la parte baja del abdomen.",
            'flutter kicks' => "Las flutter kicks son excelentes para la parte baja del abdomen y el fortalecimiento del core.",
            'v-ups' => "Los V-ups son un ejercicio avanzado para el core que trabaja los abdominales superiores e inferiores.",

            // Ejercicios cardiovasculares
            'saltar la cuerda' => "Saltar la cuerda es excelente para el cardio, mejora la coordinación y quema muchas calorías.",
            'burpees' => "Los burpees son un ejercicio cardiovascular de alta intensidad que involucra todo el cuerpo.",
            'sprints' => "Los sprints mejoran la velocidad, la resistencia y son excelentes para el cardio en intervalos.",
            'jumping jacks' => "Los jumping jacks son un ejercicio simple de cardio que mejora la resistencia y la agilidad.",
            'escalador' => "El escalador es un ejercicio que trabaja el core y es efectivo para el cardio de alta intensidad.",
            'remo' => "El remo trabaja tanto la resistencia cardiovascular como la musculatura de la espalda y los brazos.",
            'bicicleta estática' => "La bicicleta estática es ideal para el cardio y el fortalecimiento de las piernas.",
            'caminata inclinada' => "Caminar en una inclinación en cinta mejora la resistencia cardiovascular y fortalece las piernas.",
            'correr en cinta' => "Correr en cinta es una excelente opción para mejorar el cardio y la resistencia.",
            'step' => "El step trabaja el cardio y fortalece las piernas, especialmente los glúteos y cuádriceps.",

            // Ejercicios de cuerpo completo y funcionales
            'kettlebell swing' => "El kettlebell swing es un ejercicio de cuerpo completo que fortalece el core y mejora la resistencia.",
            'clean and press' => "El clean and press es un movimiento de fuerza y potencia que trabaja casi todo el cuerpo.",
            'explosivo' => "El power snatch es un levantamiento explosivo que entrena la potencia y la fuerza en todo el cuerpo.",
            'walking lunges' => "Las walking lunges fortalecen las piernas y mejoran el equilibrio, involucrando el core y los glúteos.",
            'combinaciones' => "Los thrusters combinan sentadillas y press de hombros, trabajando el cuerpo completo en un movimiento.",
            'box jumps' => "Los box jumps desarrollan la potencia y agilidad de las piernas, además de ser un gran ejercicio cardiovascular.",
            'bear crawl' => "El bear crawl es un ejercicio funcional que fortalece el core, los brazos y las piernas.",
            'squat jump' => "Los squat jumps son un ejercicio explosivo que trabaja las piernas y el core mientras mejora el cardio.",
            'subir la cuerda' => "Subir la cuerda mejora la fuerza de agarre, los brazos y el core.",
            'turkish get-up' => "El turkish get-up trabaja todo el cuerpo y mejora la movilidad, fuerza y coordinación.",

            // Movimientos de movilidad y calentamiento
            'foam rolling' => "El foam rolling ayuda a liberar la tensión muscular y mejora la recuperación.",
            'estiramiento de isquiotibiales' => "Estirar los isquiotibiales mejora la flexibilidad de las piernas y la postura.",
            'estiramiento de cuádriceps' => "El estiramiento de cuádriceps es ideal después de entrenar piernas para evitar rigidez.",
            'movilidad de cadera' => "La movilidad de cadera mejora la amplitud de movimiento y ayuda en ejercicios como sentadillas.",
            'estiramiento de hombros' => "Estirar los hombros previene lesiones y mejora la flexibilidad en la parte superior del cuerpo.",
            'abrir caderas' => "Abrir las caderas mejora la movilidad y es ideal antes de entrenamientos de pierna.",
            'rotación de tronco' => "Las rotaciones de tronco mejoran la movilidad en el core y previenen lesiones en la espalda.",
            'elevaciones de talones' => "Fortalecer los tobillos con elevaciones de talones mejora la estabilidad y el equilibrio.",
            'flexión de muñeca' => "La flexión de muñeca es importante para prevenir lesiones en las manos y antebrazos.",
            'estiramiento de cuello' => "El estiramiento de cuello reduce la tensión acumulada y previene dolores posturales.",

            // Ejercicios para la parte superior del cuerpo
            'jalón al pecho' => "El jalón al pecho trabaja la espalda, en especial el dorsal ancho. Es un gran ejercicio para ensanchar la espalda.",
            'flexiones de brazos' => "Las flexiones de brazos son ideales para trabajar el pecho, los tríceps y los hombros, usando solo el peso corporal.",
            'remo en polea baja' => "El remo en polea baja trabaja la parte media y baja de la espalda, además de los bíceps.",
            'aperturas con mancuernas' => "Las aperturas con mancuernas en banco plano o inclinado ayudan a ensanchar el pecho y mejorar la definición.",
            'press inclinado' => "El press inclinado se enfoca en la parte superior del pecho y ayuda a levantar y definir la musculatura pectoral.",
            'pájaros' => "Los pájaros, o elevaciones posteriores, trabajan el deltoides posterior y ayudan a fortalecer la parte trasera del hombro.",
            'curl martillo' => "El curl martillo es ideal para trabajar los antebrazos y bíceps, especialmente la cabeza larga del bíceps.",
            'extensiones de tríceps' => "Las extensiones de tríceps con mancuernas o barra ayudan a desarrollar la parte trasera del brazo.",
            'encogimientos de hombros' => "Los encogimientos fortalecen los trapecios, los músculos en la parte superior de la espalda.",
            'jalón con cuerda' => "El jalón con cuerda para tríceps ayuda a definir y fortalecer el tríceps con un rango completo de movimiento.",

            // Ejercicios para la parte inferior del cuerpo
            'elevación de glúteos' => "La elevación de glúteos es un excelente ejercicio para fortalecer los glúteos y el core.",
            'sentadilla sumo' => "La sentadilla sumo trabaja glúteos, aductores y cuádriceps, y se realiza con las piernas separadas.",
            'peso muerto rumano' => "El peso muerto rumano es efectivo para trabajar los femorales y glúteos con enfoque en la cadena posterior.",
            'sentadilla frontal' => "La sentadilla frontal pone más énfasis en los cuádriceps y core, y se realiza con la barra en la parte frontal del cuerpo.",
            'desplantes laterales' => "Los desplantes laterales son un ejercicio que trabaja las piernas, especialmente los aductores y glúteos.",
            'curl femoral' => "El curl femoral en máquina aísla los isquiotibiales, fortaleciendo la parte posterior del muslo.",
            'elevación de pelvis' => "La elevación de pelvis trabaja los glúteos y core, y es ideal para principiantes y avanzados.",
            'patada de glúteo' => "La patada de glúteo con polea o en suelo trabaja los glúteos y fortalece las caderas.",
            'prensa horizontal' => "La prensa horizontal es una variante que trabaja piernas sin tanta carga en la espalda.",
            'aductores en máquina' => "El aductor en máquina aísla y fortalece la parte interna del muslo.",

            // Ejercicios para el core
            'crunch en máquina' => "El crunch en máquina permite trabajar el abdomen con resistencia añadida.",
            'crunch inverso' => "El crunch inverso se enfoca en la parte baja del abdomen y es ideal para la zona inferior.",
            'abdominales bicicleta' => "Los abdominales bicicleta trabajan los oblicuos y la parte superior del abdomen.",
            'plancha lateral' => "La plancha lateral trabaja los oblicuos y el core, ayudando a mejorar el equilibrio.",
            'superman' => "El superman es un ejercicio en el suelo que fortalece la zona lumbar, glúteos y core.",
            'giros rusos' => "Los giros rusos trabajan los oblicuos y mejoran la fuerza de rotación del core.",
            'cadera en polea' => "Las elevaciones de cadera en polea o con peso añaden resistencia al trabajo de glúteos y core.",
            'abdominales en banco' => "Los abdominales en banco inclinado aumentan la dificultad y trabajan más intensamente el abdomen.",
            'elevación de rodillas' => "La elevación de rodillas colgado trabaja la parte baja del abdomen y el core.",
            'rotación con barra' => "La rotación con barra trabaja los oblicuos y mejora la fuerza del core en movimientos rotacionales.",

            // Ejercicios de peso corporal y funcionales
            'sentadilla con salto' => "La sentadilla con salto es un ejercicio pliométrico que mejora la potencia y resistencia de las piernas.",
            'burro' => "El burro es un movimiento para fortalecer el core y la parte superior del cuerpo.",
            'salto a caja' => "El salto a caja es un ejercicio pliométrico para mejorar la explosividad de las piernas.",
            'escalador cruzado' => "El escalador cruzado fortalece el core y mejora la coordinación al cruzar las rodillas.",
            'escalada horizontal' => "La escalada horizontal es un ejercicio de resistencia que trabaja core y brazos.",
            'golpes con balón' => "Los golpes con balón medicinal ayudan a fortalecer el core y mejorar la explosividad.",
            'desplazamiento lateral' => "El desplazamiento lateral es un ejercicio que mejora la agilidad y trabaja las piernas.",
            'lanza con balón' => "La lanza con balón es ideal para trabajar la fuerza del core y los brazos.",
            'deslizamiento abdominal' => "El deslizamiento con disco para abdomen es excelente para fortalecer el core de forma avanzada.",
            'paseos de granjero' => "Los paseos de granjero con mancuernas trabajan el core, los hombros y la resistencia de agarre.",

            // Movilidad y calentamiento
            'desplante con giro' => "El desplante con giro es un ejercicio de movilidad y fuerza para piernas y caderas.",
            'círculos de cadera' => "Los círculos de cadera mejoran la movilidad en las caderas y preparan para ejercicios de pierna.",
            'movilidad de muñecas' => "La movilidad de muñecas es esencial para prevenir lesiones en ejercicios de fuerza.",
            'rotación de hombros' => "La rotación de hombros calienta y mejora la movilidad de las articulaciones del hombro.",
            'abrir cadera en posición de cuclillas' => "Abrir las caderas en cuclillas prepara para ejercicios de pierna y mejora la movilidad.",
            'elevación de rodilla a pecho' => "La elevación de rodilla a pecho ayuda a calentar caderas y mejorar la movilidad de la pierna.",
            'péndulo de pierna' => "El péndulo de pierna es un ejercicio de movilidad que mejora el rango de movimiento en las caderas.",
            'estiramiento de gato-camello' => "El gato-camello es ideal para calentar y movilizar la columna vertebral.",
            'rotación de tronco en suelo' => "La rotación de tronco en el suelo mejora la movilidad de la espalda y el core.",
            'abrir brazos en cruz' => "Abrir los brazos en cruz mejora la movilidad y estira el pecho y hombros.",

            // Cardio y otros ejercicios
            'zancadas con peso' => "Las zancadas con peso mejoran la fuerza en las piernas y el equilibrio con resistencia añadida.",
            'carrera en el lugar' => "Correr en el lugar es un ejercicio simple para mejorar el cardio y la resistencia.",
            'salto de estrella' => "El salto de estrella o jumping jack es excelente para el cardio y la coordinación.",
            'escalones' => "Los escalones en caja o escalera mejoran la resistencia de piernas y el equilibrio.",
            'remo en banco' => "El remo en banco trabaja la espalda y los brazos en un movimiento controlado y específico.",
            'bicicleta de montaña' => "La bicicleta de montaña trabaja el core y mejora la resistencia en un ejercicio de cardio.",
            'soga' => "La soga o cuerda de batalla es excelente para mejorar el cardio y trabajar los brazos.",
            'trepar cuerda' => "Trepar la cuerda mejora la fuerza de agarre y los músculos de la parte superior del cuerpo.",
            'golpe de puños' => "Los golpes de puños con mancuerna son ideales para mejorar el cardio y la resistencia de hombros.",
            'caminata en cinta' => "Caminar en cinta es una actividad de bajo impacto ideal para mejorar el cardio y resistencia.",

            // Ejercicios para la parte superior del cuerpo
            'remo con mancuerna' => "El remo con mancuerna se realiza de forma unilateral y trabaja la parte media y alta de la espalda.",
            'cruces con polea' => "Los cruces con polea ayudan a trabajar la parte media del pecho y mejorar la definición.",
            'press con mancuernas' => "El press con mancuernas es una alternativa al press de banca y permite un mayor rango de movimiento.",
            'curl concentrado' => "El curl concentrado aísla el bíceps y permite un control óptimo en cada repetición.",
            'press arnold' => "El press arnold es una variación del press de hombros que trabaja el deltoides completo.",
            'jalón tras nuca' => "El jalón tras nuca trabaja la espalda alta y los trapecios, pero requiere precaución por la postura.",
            'press cerrado' => "El press cerrado enfoca el trabajo en los tríceps y la parte interna del pecho.",
            'remo en t' => "El remo en T es ideal para la espalda media, especialmente los músculos romboides.",
            'tríceps francés' => "El tríceps francés con barra o mancuerna trabaja de forma aislada la cabeza larga del tríceps.",
            'press declinado' => "El press declinado trabaja la parte baja del pecho, ayudando a mejorar la densidad muscular en esa zona.",

            // Ejercicios para la parte inferior del cuerpo
            'peso muerto sumo' => "El peso muerto sumo se realiza con las piernas abiertas y trabaja glúteos y aductores.",
            'sentadilla pistol' => "La sentadilla pistol es una sentadilla a una pierna que mejora la fuerza, el equilibrio y la movilidad.",
            'sentadilla sissy' => "La sentadilla sissy aísla los cuádriceps y es excelente para la definición de las piernas.",
            'hip thrust' => "El hip thrust es un ejercicio que activa y fortalece los glúteos de forma intensa.",
            'sentadilla goblet' => "La sentadilla goblet con mancuerna trabaja los glúteos y mejora la postura en la sentadilla.",
            'máquina hack' => "La máquina hack permite realizar sentadillas con un ángulo diferente, enfatizando los cuádriceps.",
            'peso muerto a una pierna' => "El peso muerto a una pierna mejora la estabilidad y trabaja glúteos e isquiotibiales de forma unilateral.",
            'elevación de cadera' => "La elevación de cadera en banco o suelo trabaja los glúteos y el core.",
            'reverse lunges' => "Los reverse lunges o desplantes inversos son una variación que reduce la presión en la rodilla y trabaja glúteos y piernas.",
            'peso muerto con kettlebell' => "El peso muerto con kettlebell es una variación más ligera para fortalecer la cadena posterior.",

            // Ejercicios para el core y abdomen
            'elevaciones de tronco' => "Las elevaciones de tronco trabajan el abdomen superior y son un ejercicio clásico de core.",
            'crunch de pie' => "El crunch de pie es una alternativa al crunch en suelo y trabaja el abdomen con menos tensión en el cuello.",
            'oblicuos en máquina' => "La máquina de oblicuos permite aislar estos músculos y trabajar la rotación del core.",
            'estabilidad con fitball' => "Los ejercicios de estabilidad en fitball son ideales para fortalecer el core y mejorar el equilibrio.",
            'crunch en polea' => "El crunch en polea permite trabajar el abdomen con peso añadido, aumentando la resistencia.",
            'elevación de talones colgado' => "Este ejercicio activa el core y es ideal para los abdominales inferiores.",
            'giro de tronco' => "El giro de tronco mejora la movilidad y trabaja los oblicuos.",
            'toque de talones' => "El toque de talones es un ejercicio sencillo que activa el core y los oblicuos.",
            'rodillas al pecho' => "Llevar las rodillas al pecho en el suelo o colgado trabaja los abdominales inferiores y el core.",
            'rollout con rueda' => "El rollout con rueda es un ejercicio avanzado para el core que requiere fuerza y estabilidad.",

            // Ejercicios cardiovasculares y de resistencia
            'escalera de agilidad' => "La escalera de agilidad mejora la velocidad, coordinación y es un excelente ejercicio cardiovascular.",
            'batidas de soga' => "Las batidas de soga o battle rope son intensas para el cardio y trabajan los brazos y hombros.",
            'carrera en cuestas' => "Correr en cuestas aumenta la resistencia y fortalece las piernas.",
            'zancadas dinámicas' => "Las zancadas dinámicas combinan fuerza y cardio, trabajando el tren inferior.",
            'boxeo con sombra' => "El boxeo con sombra es un ejercicio cardiovascular que también mejora la coordinación y agilidad.",
            'skipping' => "El skipping, o elevar las rodillas, es un ejercicio de cardio que aumenta la frecuencia cardíaca rápidamente.",
            'patinador' => "El patinador es un ejercicio de salto lateral que trabaja el equilibrio y el core.",
            'correr en escalera' => "Correr en escalera mejora la resistencia y fuerza en las piernas.",
            'talones al glúteo' => "Correr con los talones al glúteo es una excelente forma de calentar y trabajar el cardio.",
            'circuito HIIT' => "Un circuito HIIT alterna ejercicios de alta intensidad y cortos descansos, perfecto para quemar calorías.",

            // Ejercicios funcionales y de peso corporal
            'banco de pectorales' => "El banco de pectorales es excelente para realizar ejercicios de pecho como el press y las aperturas.",
            'escalador frontal' => "El escalador frontal es un ejercicio que mejora el core y la resistencia cardiovascular.",
            'sentadilla isométrica' => "La sentadilla isométrica fortalece las piernas y mejora la resistencia muscular.",
            'lanza rusa' => "La lanza rusa con disco o balón entrena la rotación del core y los hombros.",
            'abducción en polea' => "La abducción de cadera en polea ayuda a fortalecer los glúteos y mejorar la estabilidad.",
            'desplazamiento del oso' => "El desplazamiento del oso es un ejercicio de peso corporal que trabaja el core y la estabilidad.",
            'paseo del cangrejo' => "El paseo del cangrejo mejora la movilidad del core y la fuerza de los brazos.",
            'escalada inversa' => "La escalada inversa es una variante que trabaja el core y los músculos de la espalda.",
            'paso con peso' => "El paso con peso fortalece piernas y glúteos, y mejora el equilibrio.",
            'rotación con balón medicinal' => "La rotación con balón medicinal entrena el core y mejora la fuerza en movimientos rotacionales.",

            // Ejercicios de movilidad y estiramiento
            'estiramiento de espalda baja' => "Estirar la espalda baja alivia la tensión y ayuda a la flexibilidad de la columna.",
            'cadera en cuatro puntos' => "La cadera en cuatro puntos estira y mejora la movilidad de las caderas.",
            'flexión de cadera' => "La flexión de cadera es ideal para mejorar la movilidad en ejercicios de pierna y sentadillas.",
            'movimientos de muñeca' => "Movilizar las muñecas es clave para prevenir lesiones en ejercicios de peso.",
            'rotación de caderas' => "La rotación de caderas mejora la movilidad y ayuda a prevenir lesiones en la parte baja del cuerpo.",
            'pierna recta' => "El estiramiento de pierna recta mejora la flexibilidad en isquiotibiales y caderas.",
            'estiramiento de brazo cruzado' => "Este estiramiento alivia la tensión en el hombro y mejora la flexibilidad.",
            'torso a rodilla' => "El torso a rodilla es un estiramiento que mejora la flexibilidad en la espalda baja.",
            'estiramiento de pierna mariposa' => "La postura de mariposa ayuda a abrir las caderas y mejorar la flexibilidad en los aductores.",
            'estiramiento de glúteos' => "Estirar los glúteos alivia la tensión y mejora la movilidad de caderas y espalda baja.",

            // Datos generales de clientes y roles
            'masculino' => "Seleccionado el género masculino. Puedes actualizar esta información en tu perfil.",
            'femenino' => "Seleccionado el género femenino. Si necesitas hacer cambios, visita tu perfil.",
            'otro género' => "Seleccionaste otro género. Asegúrate de que toda la información en tu perfil esté correcta.",
            'sedentario' => "Tu nivel de actividad es sedentario. Considera incluir caminatas o estiramientos básicos para empezar a moverte más.",
            'ligero' => "Nivel de actividad ligero. Esto es ideal para quienes están comenzando; ¡recuerda aumentar gradualmente la intensidad!",
            'moderado' => "Un nivel de actividad moderado es excelente. Mantén el equilibrio entre tus sesiones de ejercicio y descanso.",
            'activo' => "Tu actividad es activa. Un nivel adecuado para quienes buscan mantenerse en forma de manera constante.",
            'muy activo' => "¡Estás muy activo! Este nivel requiere una dieta adecuada para la energía y suficiente descanso.",

            // Especialidades de entrenadores
            'entrenador personal' => "Nuestros entrenadores personales crean planes individualizados basados en tus metas específicas.",
            'fisioterapia' => "Contamos con fisioterapeutas para ayudarte en la recuperación de lesiones y mejorar tu movilidad.",
            'nutricionista' => "Nuestros nutricionistas elaboran dietas personalizadas adaptadas a tus necesidades y objetivos.",
            'preparación física' => "Los preparadores físicos te guían en el desarrollo de fuerza, velocidad y resistencia.",
            'yoga' => "Instructores de yoga para mejorar tu flexibilidad, equilibrio y reducir el estrés.",
            'pilates' => "Entrenadores especializados en pilates, ideal para fortalecer el core y mejorar la postura.",
            'halterofilia' => "Especialistas en halterofilia para ayudarte a perfeccionar tus técnicas de levantamiento de peso.",
            'boxeo' => "Clases de boxeo para mejorar la resistencia, la velocidad y la coordinación.",
            'crossfit' => "Entrenadores certificados en CrossFit, combinando fuerza, cardio y agilidad en una sesión intensa.",
            'zumba' => "Instructores de zumba para una sesión divertida y energética mientras quemas calorías.",

            // Tipos de clases disponibles
            'spinning' => "Las clases de spinning son excelentes para mejorar la resistencia cardiovascular en sesiones de alta intensidad.",
            'body pump' => "Body Pump es una clase de fuerza con pesas y ejercicios repetitivos que ayuda a tonificar el cuerpo.",
            'step' => "El step es una clase divertida que combina cardio y coordinación sobre una plataforma elevada.",
            'kickboxing' => "El kickboxing mejora la fuerza y coordinación, combinando técnicas de boxeo y artes marciales.",
            'body combat' => "Body Combat es un ejercicio de alta energía inspirado en las artes marciales, ideal para tonificar y mejorar la resistencia.",
            'tai chi' => "El tai chi combina movimientos suaves y controlados, ideal para reducir el estrés y mejorar la flexibilidad.",
            'stretching' => "Stretching o estiramiento te ayuda a mejorar la flexibilidad y prevenir lesiones.",
            'ballet fitness' => "Ballet fitness combina técnicas de ballet con ejercicios funcionales, ayudando a tonificar y mejorar la postura.",
            'calistenia' => "Las clases de calistenia utilizan el peso corporal para ganar fuerza y flexibilidad.",
            'cardio dance' => "Cardio Dance es una clase divertida de baile que quema calorías y mejora la coordinación.",

            // Estados de reservas y suscripciones
            'pendiente' => "Tu reserva está pendiente de confirmación. Pronto recibirás un mensaje con el estado actualizado.",
            'confirmada' => "¡Tu reserva ha sido confirmada! Prepárate para tu sesión de entrenamiento.",
            'cancelada' => "La reserva ha sido cancelada. Si deseas reprogramarla, puedes hacerlo desde tu perfil.",
            'mensual' => "Tu suscripción es mensual. Se renueva automáticamente al final de cada ciclo.",
            'semestral' => "Estás suscrito por seis meses. Este plan te ofrece flexibilidad y constancia a largo plazo.",
            'anual' => "Tu suscripción anual te da acceso a todas las instalaciones y clases durante un año completo.",

            // Niveles de entrenamiento
            'principiante' => "Nivel principiante: este es un excelente punto de partida para construir tu resistencia y técnica.",
            'intermedio' => "Nivel intermedio: tus sesiones ahora incluirán mayor intensidad y ejercicios variados.",
            'avanzado' => "Nivel avanzado: enfocado en rutinas intensas y técnicas avanzadas para maximizar tu rendimiento.",

            // Blog y foro
            'foro' => "El foro es un espacio donde puedes compartir experiencias y resolver dudas con otros usuarios.",
            'foros' => "En los foros de nuestra comunidad encontrarás temas diversos sobre entrenamiento y nutrición.",
            'blog' => "Consulta el blog para obtener consejos de nuestros entrenadores sobre ejercicio, nutrición y bienestar.",
            'blogs' => "Nuestros blogs están llenos de contenido útil para ayudarte en tu viaje de fitness y bienestar.",

            // Estado de productos
            'productos' => "Encuentra todo tipo de productos en nuestra tienda, desde suplementos hasta equipos de entrenamiento.",
            'pendiente envío' => "El producto está pendiente de envío. Recibirás una notificación cuando esté en camino.",
            'enviado' => "¡Tu producto ha sido enviado! Recibirás un número de seguimiento en breve.",
            'entregado' => "El producto ha sido entregado. Gracias por tu compra y disfrútalo.",
            'cancelado' => "El pedido fue cancelado. Si necesitas ayuda, contacta a nuestro equipo de soporte.",

            // Objetivos de entrenamiento
            'pérdida de peso' => "Para perder peso, combina ejercicio cardiovascular con una dieta balanceada y en déficit calórico.",
            'ganancia muscular' => "Para ganar masa muscular, enfócate en ejercicios de fuerza y mantén una ingesta calórica adecuada.",
            'mantenimiento' => "Para mantenimiento, sigue una dieta equilibrada y una rutina que incluya tanto fuerza como cardio.",

            // Detalles de entrenamiento
            'series' => "Las series ayudan a estructurar tus entrenamientos y progresar en fuerza y resistencia.",
            'repeticiones' => "Las repeticiones determinan la cantidad de veces que realizarás cada ejercicio en una serie.",
            'kilos' => "Ajusta los kilos según tu nivel de experiencia y tus metas. Escucha siempre a tu cuerpo.",
            'peso' => "Tu peso puede ser una referencia para ajustar tu dieta y tus entrenamientos de manera personalizada.",

            // Estado y roles de usuarios
            'rol' => "Tu rol define el acceso a ciertas áreas de la plataforma, como entrenamiento o administración.",
            'activo' => "Tu estado es activo. Tienes acceso completo a todos los servicios del gimnasio.",
            'suspendido' => "Tu cuenta está suspendida. Contacta al soporte para obtener más información y resolver el estado.",

            // Información de contacto
            'contacto' => "Para contactarnos, utiliza el formulario en nuestra página de contacto o llama a nuestro teléfono.",
            'no contestado' => "El mensaje no ha sido contestado aún. Nuestro equipo se pondrá en contacto pronto.",
            'contestado' => "El mensaje ha sido respondido. Revisa tus mensajes para ver la respuesta.",
            'teléfono' => "Nuestro número de teléfono es 555-0123. No dudes en llamarnos para más información.",
            'correo' => "Puedes escribirnos a info@thegymmondelo.com y te responderemos lo antes posible.",
            'dirección' => "Nos encontramos en el centro de la ciudad, cerca de la plaza principal.",
            'email' => "Nuestro email para consultas es contacto@thegymmondelo.com. Escríbenos si tienes dudas.",

            // Otros términos y temas generales
            'sedentario' => "Sedentario: un nivel bajo de actividad. Te animamos a empezar con ejercicios ligeros y caminar.",
            'ligero' => "Ligero: con algo de actividad física semanal. Es un buen punto de partida para progresar.",
            'moderado' => "Moderado: actividad física regular. Mantén el equilibrio y cuida tu descanso.",
            'activo' => "Activo: haces ejercicio de forma habitual, sigue con tu disciplina.",
            'muy activo' => "Muy activo: haces ejercicio intenso o trabajo físico exigente. Asegúrate de cuidar tu alimentación y descanso.",
            'serie' => "Una serie es un grupo de repeticiones que realizas antes de tomar un descanso.",
            'repetición' => "Las repeticiones son el número de veces que ejecutas un ejercicio en una serie.",

            // Estado de órdenes y pedidos
            'pendiente' => "El pedido está pendiente de confirmación. Se te notificará sobre cualquier actualización.",
            'confirmada' => "¡Pedido confirmado! Se procederá con el envío.",
            'cancelada' => "El pedido ha sido cancelado. Contacta a soporte si tienes alguna duda.",
            'entregado' => "El pedido ha sido entregado. ¡Gracias por confiar en nosotros!",

            // Estados de actividad física
            'niveles de actividad' => "Los niveles de actividad disponibles son: sedentario, ligero, moderado, activo y muy activo. Selecciona el que más se ajuste a tu estilo de vida.",

            // Tipos de suscripción
            'tipos de suscripción' => "Ofrecemos suscripciones mensual, semestral y anual, cada una con beneficios y precios diferentes.",

            // Estados de la cuenta
            'estados de cuenta' => "Los estados de cuenta pueden ser: activo y suspendido. Asegúrate de que tu cuenta esté activa para disfrutar de nuestros servicios.",

            // Roles de usuario
            'roles de usuario' => "Los roles de usuario en nuestra plataforma incluyen cliente, entrenador, administrador y personal de soporte.",

            // Objetivos de entrenamiento
            'objetivos de entrenamiento' => "Nuestros programas de entrenamiento están diseñados para los siguientes objetivos: pérdida de peso, ganancia muscular y mantenimiento físico.",

            // Tipos de clase
            'clases disponibles' => "Las clases que ofrecemos incluyen: spinning, body pump, zumba, pilates, yoga, kickboxing y mucho más. Consulta el horario para encontrar la que más te interese.",

            // Estados de pedidos y reservas
            'estados de pedidos' => "Los estados de los pedidos pueden ser: pendiente, enviado, entregado y cancelado.",
            'estados de reservas' => "Las reservas pueden tener los siguientes estados: pendiente, confirmada y cancelada. Asegúrate de revisar el estado antes de tu visita.",

            // Especialidades de entrenadores
            'especialidades de entrenadores' => "Nuestros entrenadores están especializados en diferentes áreas, como: nutrición, fisioterapia, preparación física, yoga, pilates, halterofilia y crossfit. Consulta sus perfiles para más detalles.",

            // Niveles de entrenamiento
            'niveles de entrenamiento' => "Los niveles de entrenamiento se dividen en principiante, intermedio y avanzado. Cada nivel está diseñado para adaptarse a tus necesidades y capacidades.",

            // Estados de productos (podrías editar "pendiente", "enviado", "entregado" y "cancelado" para hacerlos más globales)
            'estados de productos' => "Los estados de los productos pueden ser: pendiente de envío, enviado, entregado o cancelado.",

            // Estados de contacto (podrías editar "contacto", "no contestado", y "contestado")
            'estados de contacto' => "Los estados de los mensajes de contacto son: no contestado y contestado. Responderemos en breve.",

            // Blog y foro (ya tienes "foro", "foros", "blog" y "blogs", podrías unificarlos)
            'blog y foros' => "Accede al blog para leer contenido exclusivo de nuestros entrenadores y a los foros para compartir experiencias con otros usuarios.",

            // Suscripciones (podrías editar "mensual", "semestral", y "anual")
            'planes de suscripción' => "Los planes de suscripción disponibles son mensual, semestral y anual, con beneficios según el tiempo de suscripción.",

            // Respuesta por defecto
            'default' => "Lo siento, no entendí tu pregunta. ¿Puedes intentarlo de otra forma?",
        ];

        foreach ($responses as $keyword => $response) {
            // Verifica si la palabra clave está presente en la pregunta
            if (strpos($question, $keyword) !== false) {
                // Si la palabra clave se encuentra, devuelve la respuesta correspondiente
                return response($response);
            }
        }
        // Respuesta por defecto
        return response($responses['default']);
    }
}
