import SurveyPreview from './survey-common';
import SurveyPreview from './survey-preview';
import SurveyEditor from './survey-editor';
import SurveyIndex from './survey-index';
import SurveyIndex from './survey-routes';

angular.module("MyApp",
  ['ngRoute', 'SurveyIndex', 'SurveyEditor', 'SurveyPreview', 'SurveyRoutes'])
