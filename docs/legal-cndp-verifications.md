# SEWT — registre et préparation à la conformité (26/10/2026)

## Informations publiques croisées (à confirmer avec le Kbis / extrait du registre marocain)

- Dénomination : Sun Energy and Water Technologies Group / SEWT Group.
- SARL, capital déclaré : 100 000 MAD.
- Registre de commerce de Témara : **139871**.
- ICE : **003317571000039**.
- Sources publiques : https://litigo.ma/fr/company/2151287/sun-energy-and-water-technologies-group/ ; https://www.charika.ma/societe-sun-energy-and-water-technologies-group-1205960 ; https://taqapro.amee.ma/project/sewto/
- **Précaution** : la décision de maquette demande « Témara, Maroc » sur les pages marketing ; faire confirmer la bonne adresse statutaire à inclure dans les mentions légales avant la publication définitive. La chronologie du fondateur commence en 1992, distincte de la création juridique de cette SARL (2023).

## Protection des données — exigences de conformité marocaines

Références : https://www.cndp.ma/conformite-des-sites-web/ ; https://www.cndp.ma/procedures-de-notification-process/

- [x] Information du visiteur sur la finalité (répondre à une demande), données obligatoires/facultatives, destinataires et prestataires, contact pour droits, sur /confidentialite.
- [x] Lien visible vers /confidentialite depuis la fenêtre « Nous écrire », accord non précoché.
- [x] Footer lié à de vraies pages /mentions-legales et /confidentialite, sans liens morts.
- [x] Bouton e-mail et traitement serveur préservés, aucune clé API dans le code public.
- [ ] **Vérifier/obtenir la référence de déclaration CNDP** du traitement Contact et ajouter sa référence réelle ; ne jamais inventer de récépissé.
- [ ] Vérifier si le traitement Vercel/Resend/Upstash implique une formalité de transfert de données à l'étranger et la réaliser si applicable avant activation.
- [ ] Confirmer le représentant légal, le siège statutaire complet, le RC/ICE sur extrait récent, les coordonnées de l'hébergeur contractuel.
- [ ] Fixer et appliquer une durée réelle de conservation des demandes, notamment dans la boîte e-mail et chez le prestataire ; documenter le processus d'effacement.
- [ ] Configurer le vrai domaine expéditeur dans Resend (DNS SPF/DKIM), enregistrer la vraie clé `RESEND_API_KEY` et `RESEND_FROM_EMAIL` seulement via un espace privé Vercel, puis réaliser un essai réception + rebonds.
- [ ] Tester les pages en Preview du commit final, examiner le résultat sur iPhone avant l'autorisation de production.

**Statut :** documentation et pages codées. Il serait inexact de qualifier l'ensemble de « conformité juridique certifiée » sans les vérifications et formalités listées.
