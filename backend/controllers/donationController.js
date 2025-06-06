import db from "../firebase/firebaseAdmin.js";

export const saveDonation = async (req, res) => {
  try {
    const { formData, paymentDetails } = req.body;

    const docRef = await db.collection("donations").add({
      ...formData,
      paymentDetails,
      createdAt: new Date().toISOString(),
    });

    res.status(200).json({ success: true, id: docRef.id });
  } catch (error) {
    console.error("Failed to save donation:", error);
    res.status(500).json({ success: false, error: "Server error" });
  }
};

export const getDonors = async (req, res) => {
  try {
    const snapshot = await db.collection("donations").orderBy("createdAt", "desc").get();

    const donors = snapshot.docs.map(doc => {
      const data = doc.data();
      return {
        id: doc.id,
        name: data.name,
        amount: data.amount,
        city: data.address || "N/A",
        // email: data.email || "N/A",
        // phone: data.phone || "N/A",
        date:data.date || "N/A",
      };
    });

    res.status(200).json({ success: true, donors });
  } catch (error) {
    console.error("Failed to fetch donors:", error);
    res.status(500).json({ success: false, error: "Failed to fetch donors" });
  }
};
