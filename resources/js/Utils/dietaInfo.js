export const getDietaInfo = (objetivo) => {
    switch (objetivo) {
        case "Pérdida de peso":
            return {
                descripcion: `Esta dieta está diseñada para reducir la ingesta calórica diaria mientras te proporciona los nutrientes necesarios para mantener un nivel de energía saludable.

                            Se basa en alimentos bajos en grasa y ricos en fibra, como las verduras de hoja verde, proteínas magras y fuentes limitadas de carbohidratos complejos.

                            Se recomienda beber mucha agua, evitar azúcares añadidos y comer porciones controladas.

                            Las comidas son simples pero efectivas, con un enfoque en alimentos frescos, no procesados, y evitando el exceso de grasas saturadas o carbohidratos refinados.

                            El ejercicio cardiovascular complementa esta dieta para acelerar el proceso de pérdida de peso y mantener la masa muscular.`,
                comidas: {
                    desayuno: [
                        "Batido verde detox con espinacas, apio y manzana",
                        "Omelette de claras de huevo con champiñones y espinacas",
                        "Yogur griego bajo en grasa con moras y nueces",
                        "Tostadas de pan integral con aguacate y tomate",
                        "Té verde sin azúcar",
                    ],
                    almuerzo: [
                        "Ensalada de espinacas con pollo y vinagreta ligera",
                        "Sopa de verduras sin crema",
                        "Pollo a la plancha con brócoli al vapor",
                        "Atún a la parrilla con ensalada verde",
                        "Quinoa con verduras al vapor",
                    ],
                    merienda: [
                        "Zanahorias baby con hummus de garbanzos",
                        "Té verde sin azúcar y rodajas de pepino",
                        "Frutas variadas como manzanas, peras y uvas",
                        "Palitos de apio con mantequilla de almendras",
                        "Pepino con queso cottage",
                    ],
                    cena: [
                        "Pescado blanco con limón y ensalada de pepino",
                        "Tofu a la parrilla con ensalada de col rizada",
                        "Sopa de lentejas con espinacas y zanahorias",
                        "Pechuga de pavo al horno con espárragos",
                        "Ensalada de garbanzos con aceite de oliva y limón",
                    ],
                },
            };
        case "Ganancia muscular":
            return {
                descripcion: `Este plan de dieta está centrado en la ingesta de alimentos ricos en proteínas y carbohidratos complejos para ayudar a la construcción y reparación muscular.

                            El consumo adecuado de calorías es esencial, aumentando gradualmente las porciones de carbohidratos y proteínas para proporcionar la energía necesaria durante los entrenamientos intensivos.

                            Es recomendable incluir fuentes de proteínas de alta calidad, como pechuga de pollo, carne magra y huevos, junto con carbohidratos de bajo índice glucémico como la quinoa y el arroz integral.

                            No se deben olvidar las grasas saludables, como las del aguacate, para asegurar una recuperación muscular adecuada y mejorar el rendimiento.

                            La hidratación constante y los suplementos de proteínas pueden ser necesarios en esta etapa de ganancia muscular.`,
                comidas: {
                    desayuno: [
                        "Huevos revueltos con avena y un plátano",
                        "Batido de proteínas con leche de almendra, mantequilla de maní y avena",
                        "Tostadas de pan integral con aguacate y huevo poché",
                        "Yogur griego con frutos secos y miel",
                        "Smoothie de frutas con proteína de suero",
                    ],
                    almuerzo: [
                        "Pechuga de pollo a la plancha con arroz integral y espinacas",
                        "Salmón al horno con quinoa y espárragos",
                        "Carne magra con batata y brócoli",
                        "Atún con arroz integral y aguacate",
                        "Tacos de pollo con tortillas integrales y vegetales",
                    ],
                    merienda: [
                        "Batido post-entrenamiento con proteínas, avena y arándanos",
                        "Frutas variadas como manzanas, peras y uvas",
                        "Yogur griego con miel, nueces y frutas frescas",
                        "Almendras y nueces",
                        "Barrita de proteína casera",
                    ],
                    cena: [
                        "Filete de ternera con puré de patatas y verduras asadas",
                        "Pollo a la parrilla con aguacate y arroz integral",
                        "Ensalada de atún con aguacate, tomate y aceite de oliva",
                        "Salmón a la parrilla con ensalada de espinacas",
                        "Tortilla de claras de huevo con espinacas y champiñones",
                    ],
                },
            };
        case "Mantenimiento":
            return {
                descripcion: `La dieta de mantenimiento tiene como objetivo preservar el peso actual mientras se sigue un patrón alimenticio saludable y equilibrado.

                            Este enfoque incluye una combinación de proteínas magras, carbohidratos complejos y grasas saludables para asegurar que el cuerpo reciba todos los macronutrientes necesarios sin exceder en calorías.

                            Es clave mantener porciones adecuadas y evitar alimentos procesados o con azúcares añadidos.

                            La actividad física regular, como el entrenamiento de fuerza y el cardio moderado, debe mantenerse para apoyar el equilibrio entre las calorías consumidas y las gastadas.

                            Esta dieta es flexible y permite disfrutar de una variedad de alimentos nutritivos y frescos mientras se promueve un estilo de vida saludable.`,
                comidas: {
                    desayuno: [
                        "Tostadas de pan integral con aguacate y huevo poché",
                        "Yogur griego con miel, nueces y frutas frescas",
                        "Batido de proteínas con frutas y avena",
                        "Cereales integrales con leche desnatada y frutas",
                        "Smoothie de espinacas, plátano y semillas de chía",
                    ],
                    almuerzo: [
                        "Salmón a la parrilla con ensalada de espinacas y quinoa",
                        "Pollo al horno con batata y judías verdes",
                        "Sándwich integral de pavo con aguacate y tomate",
                        "Ensalada de garbanzos con vegetales frescos",
                        "Arroz integral con pollo y verduras",
                    ],
                    merienda: [
                        "Frutas variadas como manzanas, peras y uvas",
                        "Almendras y nueces como snack saludable",
                        "Palitos de zanahoria con hummus",
                        "Yogur griego con frutas y granola",
                        "Batido de proteínas con leche de almendra",
                    ],
                    cena: [
                        "Ensalada de garbanzos con verduras frescas y aderezo de limón",
                        "Arroz integral con verduras salteadas y tofu",
                        "Sopa de lentejas con espinacas y zanahorias",
                        "Pollo al horno con ensalada de col rizada",
                        "Pescado a la parrilla con espárragos y quinoa",
                    ],
                },
            };
        default:
            return {
                comidas: {
                    desayuno: [],
                    almuerzo: [],
                    merienda: [],
                    cena: [],
                },
                descripcion: "No hay detalles disponibles para este objetivo.",
            };
    }
};
