import Poll from '../models/Poll.js';

export const createPoll = async (pollData) => {
  try {
    const newPoll = new Poll(pollData);
    await newPoll.save();
    return newPoll;
  } catch (error) {
    console.error('Error creating poll:', error);
    throw new Error('Poll creation failed');
  }
};

export const voteOnOption = async (pollId, optionText) => {
  try {
    const poll = await Poll.findOneAndUpdate(
      { _id: pollId, 'options.text': optionText },
      { $inc: { 'options.$.votes': 1 } },
      { new: true }
    );

    console.log('Vote registered:', poll);
  } catch (error) {
    console.error('Error registering vote:', error);
  }
};

export const getPollsByTeacher = async (req, res) => {
  const { teacherUsername } = req.params;

  try {
    const polls = await Poll.find({ teacherUsername });

    res.status(200).json({
      status: 'success',
      data: polls,
    });
  } catch (error) {
    console.error('Error fetching polls:', error);
    res.status(500).json({ status: 'error', message: 'Failed to fetch polls' });
  }
};
