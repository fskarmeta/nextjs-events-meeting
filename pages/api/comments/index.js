const handler = (req, res) => {
  const dummy = [
    { email: 'juan@unmail.com', text: 'que tal', name: 'juan', id: 'e1' },
  ];

  res.status(200).json(dummy);
};

export default handler;
