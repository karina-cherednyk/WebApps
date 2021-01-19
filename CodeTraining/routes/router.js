const express = require('express');
const router = express.Router();
const fs = require('fs');
const { Applier, Training } = require('../dao');

const config = JSON.parse(fs.readFileSync('../config.json'));
const enLabels = JSON.parse(fs.readFileSync('../public/data/en/labels.json'));
const uaLabels = JSON.parse(fs.readFileSync('../public/data/ua/labels.json'));

function getMainContent(lang){
  const data = fs.readFileSync(`../public/data/${lang}/mainPageContent`).toString();
  return data.split(/\n\s*\n/);
}
function getAboutContent(lang){
  const data = fs.readFileSync(`../public/data/${lang}/aboutContent`).toString();
  return data.split(/\n\s*\n/);
}
function getLabels(lang) {
  return lang == 'en' ? enLabels : uaLabels;
}

function getTraining(trainData, lang){
  const doc = trainData._doc;
  return {
    'name': doc.name.get(lang),
    'slogan': doc.slogan.get(lang),
    'details': doc.details.get(lang)
  }
}
function getLang(req){
  const cookieLang = req.cookies['lang'];
  const queryLang = req.query.lang;

  if(queryLang) return queryLang;
  else if(cookieLang) return  cookieLang;
  else return  'en';
}

router.get('/',  (req, res) =>  {
  res.redirect('main');
});

router.get('/confirmation/:hash', async (req, res) => {
  const hash = req.params.hash;
  const lang = getLang(req);
  const labels = getLabels(lang);
  await Applier.findByIdAndUpdate(hash, {confirmedEmail: true});
  res.render('confirmation',
      { page: 'confirmation', lang, config, labels });
});

router.get('/trainings', async (req, res) =>  {
  const lang = getLang(req);
  const trainingsData = await Training.find();
  const trainings = trainingsData.map( x=> getTraining(x, lang));
  const labels = getLabels(lang);
  res.cookie('lang', lang).render('train',
      { page: 'trainings', labels,
        lang , trainings, config});
});

router.get('/admin/addTraining', (req, res) => {
  const lang = getLang(req);
  const labels = getLabels(lang);
  res.cookie('lang', lang).render('addTraining', { page: 'admin/addTraining', labels, lang , config});
});

router.get('/admin/checkAppliers', async (req, res) => {
  const lang = getLang(req);
  const labels = getLabels(lang);
  let appliers;
  if(config.emailConfirmation)
    appliers = await Applier.find({confirmedEmail: true});
  else
    appliers = await Applier.find();

  res.cookie('lang', lang).render('checkAppliers', { page: 'admin/checkAppliers', appliers, labels, lang , config});
});

router.get('/about', async (req, res) => {
  const lang = getLang(req);
  const labels = getLabels(lang);
  res.cookie('lang', lang).render('about',
      { page: 'about', lang, config, labels,
        content: getAboutContent(lang)
        });
});


router.get('/main', (req, res) => {
  const lang = getLang(req);
  const labels = getLabels(lang);
  res.cookie('lang', lang).render('main',
      { page: 'main', lang , config, labels,
        content: getMainContent(lang)
      });
});


module.exports = router;
