const express = require("express")
const router = express.Router()
const prisma = require("../src/prisma") 


router.get("/", async (req, res) => {
  try {
    const users = await prisma.users.findMany()
    res.json(users)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

router.get("/:id", async (req, res) => {
  try {
    const user = await prisma.users.findUnique({
      where: { id: Number(req.params.id) }
    })
    if (!user) return res.status(404).json({ error: "Utilisateur non trouvé" })
    res.json(user)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

router.post("/", async (req, res) => {
  try {
    const { name, email, role } = req.body
    const user = await prisma.users.create({
      data: { name, email, role }
    })
    res.status(201).json(user)
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
})

module.exports = router;