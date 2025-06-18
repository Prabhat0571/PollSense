import Teacher from '../models/Teacher.js';

export const loginTeacher = async (req, res) => {
  try {
    const randomNumber = Math.floor(1000 + Math.random() * 9000);
    const teacherUsername = `teacher${randomNumber}`;
    const newTeacher = new Teacher({ username: teacherUsername });

    await newTeacher.save();

    res.status(201).json({
      status: 'success',
      username: newTeacher.username,
    });
  } catch (error) {
    console.error('Teacher login failed:', error);
    res.status(500).json({ status: 'error', message: 'Login failed' });
  }
};
