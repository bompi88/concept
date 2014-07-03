/**
 * Configuration of the Iron-router
 */
Router.configure({
  layoutTemplate: 'MasterLayout',
  notFoundTemplate: 'NotFound',
  templateNameConverter: 'upperCamelCase',
  routeControllerNameConverter: 'upperCamelCase',
  yieldTemplates: {
    'TopNavbar':{to: 'nav'},
    'Footer': {to: 'footer'}
  }
});
