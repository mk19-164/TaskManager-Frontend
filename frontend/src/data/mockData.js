export const categories = [
  {
    id: "1",
    name: "Universidad",
    description: "Tareas vinculadas a estudio, parciales y trabajos prácticos.",
    active: true,
  },
  {
    id: "2",
    name: "Trabajo",
    description: "Seguimiento de pendientes laborales y entregas.",
    active: true,
  },
  {
    id: "3",
    name: "Personal",
    description: "Objetivos diarios, recordatorios y organización personal.",
    active: true,
  },
];

export const tasks = [
  {
    id: "1",
    title: "Terminar trabajo final",
    description:
      "Desarrollar frontend y backend del proyecto final con autenticación, CRUD completo y arquitectura en capas.",
    category: "Universidad",
    priority: "Alta",
    status: "Pendiente",
  },
  {
    id: "2",
    title: "Preparar presentación",
    description:
      "Armar la exposición del proyecto con pantallas, arquitectura y flujo de autenticación.",
    category: "Universidad",
    priority: "Media",
    status: "Completada",
  },
  {
    id: "3",
    title: "Subir avances al repositorio",
    description:
      "Actualizar GitHub con la estructura inicial del frontend y backend.",
    category: "Trabajo",
    priority: "Media",
    status: "Pendiente",
  },
  {
    id: "4",
    title: "Organizar tareas personales",
    description:
      "Separar pendientes personales y ordenar prioridades de la semana.",
    category: "Personal",
    priority: "Baja",
    status: "Pendiente",
  },
];