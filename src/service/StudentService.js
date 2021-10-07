const StudentService = () => {
  const findAll = () => {
    const students = [
      {
        fullName: "Hernán Cervera",
        enrollmentId: "12218890",
      },
      {
        fullName: "Juan Sauri",
        enrollmentId: "92465587",
      },
      {
        fullName: "Emilia Grace",
        enrollmentId: "56567894",
      },
      {
        fullName: "Alejandra Gutiérrez",
        enrollmentId: "23238945",
      },
      {
        fullName: "Pedro Manzanilla",
        enrollmentId: "77778945",
      },
    ];

    return students;
  };

  return { findAll };
};

export default StudentService;
