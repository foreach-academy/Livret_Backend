import Formation from '../models/formation.js';
import Module from '../models/module.js';
import User from '../models/user.js';
import Evaluation from '../models/evaluation.js';
import EvaluationResultat from '../models/evaluationResultat.js';
import xss from 'xss';

class FormationServ {
    // Récupérer toutes les formations
    async getAllFormation() {
        return await Formation.findAll();
    }

    // Récupérer les utilisateurs par ID de formation
    async getUsersByFormationId(formationId) {
        return await Formation.findByPk(formationId, {
            include: [{
                model: User,
                as: 'user',
            }]
        });
    }
    // récuperer l'évaluation d'un étudiant par son module 
    async getStudentEvaluationsByModule(studentId, moduleId) {
        const studentWithEvaluation = await User.findOne({
            where: { id: studentId },
            include: [{
                model: Evaluation,
                as: 'evaluation',
                where: { module_id: moduleId },
                required: false,
                include: [{
                    model: EvaluationResultat,
                    as: 'resultat',
                    attributes: ['name'],
                }]
            }]
        });
        return studentWithEvaluation;
    }

    // Récupérer les évaluations des étudiants par formation et module
    async getStudentsEvaluationsByFormationAndModule(formationId, moduleId) {
        const formationWithStudents = await Formation.findByPk(formationId, {
            include: [{
                model: User,
                as: 'apprenants',
                include: [{
                    model: Evaluation,
                    as: 'evaluation',
                    where: { module_id: moduleId },
                    required: false,
                    include: [{
                        model: EvaluationResultat,
                        as: 'resultat',
                        attributes: ['name'],
                    }]
                }]
            }]
        });
        return formationWithStudents;
    }

    // récupérer un module par l'ID d'une formation
    async getModulesByFormationId(formationId) {
        return await Formation.findByPk(formationId, {
            include: [{
                model: Module,
                as: 'modules',
            }]
        });
    }

    // Récupérer les modules par ID de formation et ID de formateur
    async getModulesByFormationIdAndFormateurId(formationId, formateurId) {
        return await Formation.findByPk(formationId, {
            include: [{
                model: Module,
                as: 'modules',
                where: { formateur_id: formateurId }
            }]
        });
    }

    // Ajouter une nouvelle formation
    async addFormation(formationData) {
        try {
            // Validation des données d'entrée
            if (!formationData.title || !formationData.start_date || !formationData.end_date) {
                throw new Error('Les champs title, start_date et end_date sont requis');
            }

            // Nettoyage des données pour éviter les attaques XSS
            formationData.title = xss(formationData.title);
            formationData.start_date = xss(formationData.start_date);
            formationData.end_date = xss(formationData.end_date);
            if (formationData.commentary) {
                formationData.commentary = xss(formationData.commentary);
            }

            return await Formation.create(formationData, {
                include: [Module, { model: User, as: 'user' }]
            });
        } catch (error) {
            console.error("Erreur lors de l'ajout de la formation:", error);
            throw error;
        }
    }
}

export default new FormationServ();