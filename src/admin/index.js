const express = require('express');
const path = require('path');

const router = express.Router(); // facem un router local, care va fi legat de ruta /admin

// definim folderul public ca fiind static
// tot aici, avem 
router.use(express.static(path.join(__dirname, 'public')));

module.exports = router;
