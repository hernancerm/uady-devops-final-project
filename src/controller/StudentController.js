const StudentController = (studentService) => {
  const getAll = (req, res) => {
    res.status(200).json(studentService.findAll());
  };

  return { getAll };
};

export default StudentController;
