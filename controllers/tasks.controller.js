const tasks = require('../models/tasks.model');
const xml2js = require('xml2js');

// 0. Recuperer toutes les taches au format XML
exports.getAllTasksXML = (req, res) => {
    const builder = new xml2js.Builder({rootName: 'tasks'});
    const xml = builder.buildObject({ task: tasks});
    
    res.header('Content-Type', 'application/xml');

    res.status(200).send(xml);
}

// 1. Recuperer toutes les taches
exports.getAllTasks = (req, res) => {
    res.status(200).json(tasks);
}

// 2. Recuperer une tache par son id
exports.getOneTask = (req, res) => {
    const id = parseInt(req.params.id );
    const task = tasks.find(t => t.id === id);

    task ? res.status(200).json(task) : res.status(404).json({ error: 'Tâche non trouvée' });
}

// 3. Creer une tache
exports.createTask = (req, res) => {
    const newTask = {
        id: tasks.length + 1,
        titre: req.body.titre,
        statut: req.body.statut
    };
    
    tasks.push(newTask);

    res.status(201).json(newTask);
}

// 4. Modifier une tache
exports.updateTask = (req, res) => {
    const id = parseInt(req.params.id);
    const task = tasks.find((t) => t.id === id);

    if (task) {
        task.titre = req.body.titre;
        task.statut = req.body.statut;
        
        res.status(200).json(task);
    } else {
        res.status(404).json({ error: 'Tâche non trouvée : Mise à jour impossible' });
    }
}

// 5. Supprimer une tache
exports.deleteTask = (req, res) => {
    const taskId = parseInt(req.params.id);
    const taskIndex = tasks.findIndex((t) => t.id === taskId);
    if (taskIndex !== -1) {
        tasks.splice(taskIndex, 1);
        res.status(204).send();
    } else {
        res.status(404).json({ error: 'Tâche non trouvée : Suppression impossible' });
    }
}