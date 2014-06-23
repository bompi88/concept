Router.configure({
  layoutTemplate: 'MasterLayout',
  loadingTemplate: 'Loading',
  notFoundTemplate: 'NotFound',
  templateNameConverter: 'upperCamelCase',
  routeControllerNameConverter: 'upperCamelCase',
  yieldTemplates: {
    'TopNavbar':{to: 'nav'},
    'Footer': {to: 'footer'}
  }
});