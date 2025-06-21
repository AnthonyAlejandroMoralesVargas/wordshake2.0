import { GrammarSession } from '../types';

export const grammarSessions: GrammarSession[] = [
  // Beginner Sessions
  {
    id: '1',
    title: 'Basic Present Simple',
    difficulty: 'beginner',
    category: 'Grammar',
    sentences: [
      {
        id: 1,
        text: "I live in New York.",
        translation: "Vivo en Nueva York.",
        grammarPoint: "Present Simple - First person singular"
      },
      {
        id: 2,
        text: "She works at a hospital.",
        translation: "Ella trabaja en un hospital.",
        grammarPoint: "Present Simple - Third person singular"
      },
      {
        id: 3,
        text: "They speak English.",
        translation: "Ellos hablan inglés.",
        grammarPoint: "Present Simple - Third person plural"
      },
      {
        id: 4,
        text: "We study every day.",
        translation: "Nosotros estudiamos todos los días.",
        grammarPoint: "Present Simple - First person plural"
      },
      {
        id: 5,
        text: "You like coffee.",
        translation: "Te gusta el café.",
        grammarPoint: "Present Simple - Second person"
      }
    ]
  },
  {
    id: '2',
    title: 'Basic Questions',
    difficulty: 'beginner',
    category: 'Grammar',
    sentences: [
      {
        id: 1,
        text: "Do you speak Spanish?",
        translation: "¿Hablas español?",
        grammarPoint: "Yes/No questions with 'do'"
      },
      {
        id: 2,
        text: "Where do you live?",
        translation: "¿Dónde vives?",
        grammarPoint: "Wh-questions with 'do'"
      },
      {
        id: 3,
        text: "What time is it?",
        translation: "¿Qué hora es?",
        grammarPoint: "Wh-questions with 'be'"
      },
      {
        id: 4,
        text: "Are you a student?",
        translation: "¿Eres estudiante?",
        grammarPoint: "Yes/No questions with 'be'"
      },
      {
        id: 5,
        text: "How old are you?",
        translation: "¿Cuántos años tienes?",
        grammarPoint: "Wh-questions with 'be'"
      }
    ]
  },
  {
    id: '3',
    title: 'Basic Negatives',
    difficulty: 'beginner',
    category: 'Grammar',
    sentences: [
      {
        id: 1,
        text: "I don't like vegetables.",
        translation: "No me gustan las verduras.",
        grammarPoint: "Negative with 'don't'"
      },
      {
        id: 2,
        text: "She doesn't work here.",
        translation: "Ella no trabaja aquí.",
        grammarPoint: "Negative with 'doesn't'"
      },
      {
        id: 3,
        text: "They aren't students.",
        translation: "Ellos no son estudiantes.",
        grammarPoint: "Negative with 'aren't'"
      },
      {
        id: 4,
        text: "We don't have time.",
        translation: "No tenemos tiempo.",
        grammarPoint: "Negative with 'don't'"
      },
      {
        id: 5,
        text: "It isn't expensive.",
        translation: "No es caro.",
        grammarPoint: "Negative with 'isn't'"
      }
    ]
  },
  // Intermediate Sessions
  {
    id: '4',
    title: 'Present Continuous',
    difficulty: 'intermediate',
    category: 'Grammar',
    sentences: [
      {
        id: 1,
        text: "I am studying for my exam.",
        translation: "Estoy estudiando para mi examen.",
        grammarPoint: "Present Continuous - First person"
      },
      {
        id: 2,
        text: "She is cooking dinner.",
        translation: "Ella está cocinando la cena.",
        grammarPoint: "Present Continuous - Third person singular"
      },
      {
        id: 3,
        text: "They are playing football.",
        translation: "Ellos están jugando fútbol.",
        grammarPoint: "Present Continuous - Third person plural"
      },
      {
        id: 4,
        text: "We are waiting for the bus.",
        translation: "Estamos esperando el autobús.",
        grammarPoint: "Present Continuous - First person plural"
      },
      {
        id: 5,
        text: "What are you doing?",
        translation: "¿Qué estás haciendo?",
        grammarPoint: "Present Continuous - Questions"
      }
    ]
  },
  {
    id: '5',
    title: 'Past Simple',
    difficulty: 'intermediate',
    category: 'Grammar',
    sentences: [
      {
        id: 1,
        text: "I went to the cinema yesterday.",
        translation: "Fui al cine ayer.",
        grammarPoint: "Past Simple - Irregular verb 'go'"
      },
      {
        id: 2,
        text: "She studied medicine at university.",
        translation: "Ella estudió medicina en la universidad.",
        grammarPoint: "Past Simple - Regular verb"
      },
      {
        id: 3,
        text: "They bought a new car.",
        translation: "Ellos compraron un coche nuevo.",
        grammarPoint: "Past Simple - Irregular verb 'buy'"
      },
      {
        id: 4,
        text: "We visited our grandparents.",
        translation: "Visitamos a nuestros abuelos.",
        grammarPoint: "Past Simple - Regular verb"
      },
      {
        id: 5,
        text: "Did you enjoy the movie?",
        translation: "¿Te gustó la película?",
        grammarPoint: "Past Simple - Questions"
      }
    ]
  },
  {
    id: '6',
    title: 'Future with Will',
    difficulty: 'intermediate',
    category: 'Grammar',
    sentences: [
      {
        id: 1,
        text: "I will call you tomorrow.",
        translation: "Te llamaré mañana.",
        grammarPoint: "Future with 'will' - First person"
      },
      {
        id: 2,
        text: "She will arrive at 3 PM.",
        translation: "Ella llegará a las 3 PM.",
        grammarPoint: "Future with 'will' - Third person"
      },
      {
        id: 3,
        text: "They will help you.",
        translation: "Ellos te ayudarán.",
        grammarPoint: "Future with 'will' - Third person plural"
      },
      {
        id: 4,
        text: "We will meet at the restaurant.",
        translation: "Nos encontraremos en el restaurante.",
        grammarPoint: "Future with 'will' - First person plural"
      },
      {
        id: 5,
        text: "Will you come to the party?",
        translation: "¿Vendrás a la fiesta?",
        grammarPoint: "Future with 'will' - Questions"
      }
    ]
  },
  // Advanced Sessions
  {
    id: '7',
    title: 'Present Perfect',
    difficulty: 'advanced',
    category: 'Grammar',
    sentences: [
      {
        id: 1,
        text: "I have been to Paris three times.",
        translation: "He estado en París tres veces.",
        grammarPoint: "Present Perfect - Experience"
      },
      {
        id: 2,
        text: "She has lived here for five years.",
        translation: "Ella ha vivido aquí durante cinco años.",
        grammarPoint: "Present Perfect - Duration"
      },
      {
        id: 3,
        text: "They have just finished their work.",
        translation: "Ellos acaban de terminar su trabajo.",
        grammarPoint: "Present Perfect - Recent actions"
      },
      {
        id: 4,
        text: "We have never seen this movie.",
        translation: "Nunca hemos visto esta película.",
        grammarPoint: "Present Perfect - Never"
      },
      {
        id: 5,
        text: "Have you ever been to Japan?",
        translation: "¿Has estado alguna vez en Japón?",
        grammarPoint: "Present Perfect - Questions"
      }
    ]
  },
  {
    id: '8',
    title: 'Conditional Sentences',
    difficulty: 'advanced',
    category: 'Grammar',
    sentences: [
      {
        id: 1,
        text: "If I had money, I would buy a car.",
        translation: "Si tuviera dinero, compraría un coche.",
        grammarPoint: "Second Conditional"
      },
      {
        id: 2,
        text: "If it rains, I will stay at home.",
        translation: "Si llueve, me quedaré en casa.",
        grammarPoint: "First Conditional"
      },
      {
        id: 3,
        text: "If I had studied harder, I would have passed.",
        translation: "Si hubiera estudiado más, habría aprobado.",
        grammarPoint: "Third Conditional"
      },
      {
        id: 4,
        text: "Unless you hurry, you will be late.",
        translation: "A menos que te apresures, llegarás tarde.",
        grammarPoint: "Conditional with 'unless'"
      },
      {
        id: 5,
        text: "I would help you if I could.",
        translation: "Te ayudaría si pudiera.",
        grammarPoint: "Second Conditional - Inverted"
      }
    ]
  },
  {
    id: '9',
    title: 'Passive Voice',
    difficulty: 'advanced',
    category: 'Grammar',
    sentences: [
      {
        id: 1,
        text: "The book was written by Shakespeare.",
        translation: "El libro fue escrito por Shakespeare.",
        grammarPoint: "Passive Voice - Past Simple"
      },
      {
        id: 2,
        text: "The house is being built.",
        translation: "La casa está siendo construida.",
        grammarPoint: "Passive Voice - Present Continuous"
      },
      {
        id: 3,
        text: "The letter has been sent.",
        translation: "La carta ha sido enviada.",
        grammarPoint: "Passive Voice - Present Perfect"
      },
      {
        id: 4,
        text: "The meeting will be held tomorrow.",
        translation: "La reunión se celebrará mañana.",
        grammarPoint: "Passive Voice - Future"
      },
      {
        id: 5,
        text: "The problem must be solved quickly.",
        translation: "El problema debe ser resuelto rápidamente.",
        grammarPoint: "Passive Voice - Modal verbs"
      }
    ]
  }
];

export const getRandomSession = (difficulty?: string): GrammarSession => {
  const filteredSessions = difficulty 
    ? grammarSessions.filter(session => session.difficulty === difficulty)
    : grammarSessions;
  return filteredSessions[Math.floor(Math.random() * filteredSessions.length)];
};

export const getSessionsByDifficulty = (difficulty: string): GrammarSession[] => {
  return grammarSessions.filter(session => session.difficulty === difficulty);
};

export const getSessionById = (id: string): GrammarSession | undefined => {
  return grammarSessions.find(session => session.id === id);
}; 