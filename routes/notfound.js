import express from 'express';
const router = express.Router();

router.use((req, res) => {
  res.status(404).json({ "Error": "Sorry, this url does not exist!" });
});

export default router;