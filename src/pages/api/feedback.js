import multer from "multer";
import path from "path";

export const config = {
  api: {
    bodyParser: false,
  },
};

const upload = multer({
  storage: multer.diskStorage({
    destination: "./public/uploads/feedback",
    filename: (req, file, cb) => {
      const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
      cb(
        null,
        file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname),
      );
    },
  }),
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB
  },
  fileFilter: (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|gif|webp/;
    const extname = allowedTypes.test(
      path.extname(file.originalname).toLowerCase(),
    );
    const mimetype = allowedTypes.test(file.mimetype);

    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb(new Error("Only image files are allowed"));
    }
  },
}).array("screenshots", 5);

export default function handler(req, res) {
  if (req.method === "POST") {
    upload(req, res, (err) => {
      if (err) {
        return res.status(400).json({ error: err.message });
      }

      // Here you would save the feedback data to your database
      const feedbackData = {
        ...req.body,
        screenshots: req.files?.map((f) => f.filename) || [],
        submittedAt: new Date().toISOString(),
      };

      console.log("Feedback received:", feedbackData);

      res.status(200).json({
        message: "Feedback submitted successfully",
        data: feedbackData,
      });
    });
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
