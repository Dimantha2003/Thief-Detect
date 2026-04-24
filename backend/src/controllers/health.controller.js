export const healthCheck = (req, res) => {
  res.status(200).json({
    success: true,
    message: "Thief Detect API is running",
  });
};
