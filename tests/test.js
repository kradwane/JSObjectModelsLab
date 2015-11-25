//import * as "../../app/scripts/modules/SpeedCheck.js" ;
//require("../../app/scripts/modules/SpeedCheck.js");










(function () {

    'use strict';

    /* global test,equal,module,start,stop,window,$,ok,expect */


    /*---------------------------------*/
    /*     PART ONE: SIMPLE MODULE     */
    /*---------------------------------*/
    module('SpeedCheck Module', {
        beforeEach: function() {

        }
    });

    // TODO: Vérifier que la création d'objets SpeedCheck est Possible

      test('Vérifier que la création d objets SpeedCheck est Possible', function() {
      var sp=createSpeedCheck() ;
      expect(1);
      ok(typeof sp !== 'undefined', 'The Shapes module sould expose a "createSpeedCheck" function');    });

    // TODO: Vérifier que les objets créés directement avec createSpeedCheck ne sont pas utilisables
    test('verification objet non utilisable', function() {
          var speed0 = createSpeedCheck();
          throws(function() {speed0.speed = 42;}, 'Exception');
          throws(function() {speed0.licencePlate='3-DFE-456';}, 'Exception');
        });

    // TODO: Vérifier que TOUTES les fonctionnalités de createSpeedCheckFR sont correctes (effects de bords, valeurs négatives, etc.) pour tous les attributs (speed et licencePlate)
    test('Vérifier que TOUTES les fonctionnalités de createSpeedCheckFR sont correctes (effects de bords, valeurs négatives, etc.) pour tous les attributs (speed et licencePlate)', function() {

    var  spcfr = createSpeedCheckFR();

    spcfr.validateInfraction(40);
    equal(spcfr._infraction, false, 'pas d infraction');
    equal(spcfr.validatePlate("DF456ZX"), true, 'matricule validé');

    spcfr.validateInfraction(140)
    equal(spcfr._infraction, true, 'infraction');
    equal(spcfr.validatePlate("DF4564ZXz"), false, 'matricule non validé');

    //valeur negatif
    spcfr.validateInfraction(-40)
    equal(spcfr._infraction, false, 'valeur negatif');
    
    //effet de bord
    spcfr.validateInfraction(130)
    equal(spcfr._infraction, false, 'effet de bord');

    });

    // TODO: Vérifier que TOUTES les fonctionnalités de createSpeedCheckBE sont correctes (effects de bords, valeurs négatives, etc.) pour tous les attributs (speed et licencePlate)

    test('Vérifier que TOUTES les fonctionnalités de createSpeedCheckBE sont correctes (effects de bords, valeurs négatives, etc.) pour tous les attributs (speed et licencePlate)', function() {
    var  spcbe = createSpeedCheckBE();

    spcbe.validateInfraction(40);
    equal(spcbe._infraction, false, 'pas d infraction');
    equal(spcbe.validatePlate("5-DFK-123"), true, 'matricule validé');

    spcbe.validateInfraction(130);
    equal(spcbe._infraction, true, 'infraction');
    equal(spcbe.validatePlate("52-FSLV-2"), false, 'matricule non validé');

    //valeur negatif
    spcbe.validateInfraction(-40)
    equal(spcbe._infraction, false, 'valeur negatif');

    //effet de bord
    spcbe.validateInfraction(120)
    equal(spcbe._infraction, false, 'effet de bord');

    });

    // TODO: Vérifier que la fonction toString() fonctionne bien.
    //  - chaine de caractère attentue pour une infracion (e.g. licencePlate === 'WD366MD' et  speed === 135):
    //  "Véhicule WD366MD roule à 135 km/h. Infraction!"

    test('Vérifier que la fonction toString() fonctionne bien.', function() {
    var vehbe=createSpeedCheckBE();
    var vehfr=createSpeedCheckFR();

    vehfr.speed=40;
    vehfr.licencePlate="AB123XY";
    equal(vehfr.toString,"Véhicule AB123XY roule à = 40 Ca va circulez...", 'tostring FR');

    vehbe.speed=160;
    vehbe.licencePlate="1-XYZ-123";
    equal(vehbe.toString,"Véhicule 1-XYZ-123 roule à = 160 Infraction!", 'tostring BE');

    });

    //  - chaine de caractère attendue pour sans infraction (e.g. licencePlate === 'WD366MD' et  speed === 105):
    //      "Véhicule WD366MD roule à 105 km/h. Ça va, circulez..."

    test('Vérifier que TOUTES les fonctionnalités de createSpeedCheckBE sont correctes (effects de bords, valeurs négatives, etc.) pour tous les attributs (speed et licencePlate)', function() {
    var veh1=createSpeedCheckFR();
    veh1.speed=105;
    veh1.licencePlate="WD366MD";
    equal(veh1.toString,"Véhicule WD366MD roule à = 105 Ca va circulez...", 'tostring BE');


   });


    /*---------------------------------*/
    /*  PART TWO: The "Shapes" module  */
    /*---------------------------------*/


  var roadAttr, amenityAttr, buildingAttr, naturalAttr;
   
    module('Unit Testing The "Shapes" Module', {
      beforeEach: function(){
        roadAttr = JSON.parse('{ \
          "building": false, \
          "highway": "Residential", \
          "_id": "-629863", \
          "nodes": [{ \
              "y": 369.0, \
              "x": 708.0 \
          }, { \
              "y": 396.0, \
              "x": 743.0 \
          }], \
          "name": "Rue de Colmar" \
          } \
        ');

        amenityAttr = JSON.parse('{\
        "_id":"-629724",\
        "nodes":[{"y":32.0,\
        "x":629.0},\
        {"y":42.0,\
        "x":597.0},\
        {"y":43.0,\
        "x":595.0},\
        {"y":32.0,\
        "x":629.0}],\
        "amenity":"parking"}');

        buildingAttr = JSON.parse('{"building":true,\
        "_id":"-629719",\
        "nodes":[{"y":0.0,\
        "x":0.0},\
        {"y":0.0,\
        "x":100.0},\
        {"y":100.0,\
        "x":100.0},\
        {"y":100.0,\
        "x":0.0},\
        {"y":0.0,\
        "x":0.0}]}');

        naturalAttr = JSON.parse('{"building":false,\
        "_id":"-630043",\
        "nodes":[{"y":309.0,\
        "x":222.0},\
        {"y":324.0,\
        "x":262.0},\
        {"y":335.0,\
        "x":231.0},\
        {"y":309.0,\
        "x":222.0}],\
        "name":"Bassin Paul Vatine",\
        "natural":"water"}');

      }
    });



    test('Test Shapes\' VERSION Property', function() {
        expect(1);
        equal(window.Shapes.VERSION, '0.0.1', 'The Shapes module should have a VERSION property');
    });

    test('Test Creation of a Default Object', function() {
      expect(2);    
      ok(typeof window.Shapes.createShape !== 'undefined', 'The Shapes module should expose a "createShape" function');
      var shape0 = window.Shapes.createShape(roadAttr);
      ok(typeof shape0 === 'object', 'The "createShape" function sould return objects.');
    });



    test('Test proper hidding of properties', function() {
      expect(5);
      var shape0 = window.Shapes.createShape(roadAttr);
      var prop;
      var props = [];
      for(prop in shape0){
      if(shape0.hasOwnProperty(prop)){
        props.push(prop);
      }
    }


    // Only 4 properties SHOULD be  visible
    //{ id: [Function], toString: [Function], toSVGPath: [Function], getName: [Function] }
   
    equal(props.length, 4, 'Only 4 properties SHOULD be  visible in objects created by "createShape"');
   
    props.forEach(function(prop){
      ok(prop === 'id' || prop === 'toString' || prop === 'toSvgPath' || 'getName', 'One of "id" "toString", "toSvgPath" or "getName"');
    });


  });



  test('Test the toSVGString method', function() {
    expect(1);
    var shape0 = window.Shapes.createShape(roadAttr);
    equal(shape0.toSvgPath(), 'M 708 369 L 743 396', 'Should create a valid SVG PATH (google SVG PATH for details)');
  });





  test('Test the name accessor', function() {
      expect(1);
      var shape0 = window.Shapes.createShape(roadAttr);
      equal(shape0.getName(), 'Rue de Colmar', 'Should return the value corresponding to the "name" property in the attributes');
  });




  test('Test the createRoad function', function() {
      expect(1);
      ok(typeof window.Shapes.createRoad !== 'undefined', 'The Shapes module sould expose a "createRoad" function');
  });



  test('Test objects created with the createRoad function', function() {
      expect(2);
      var road = window.Shapes.createRoad(roadAttr);
      ok(typeof road.getCategory === 'function', 'Object Created with "createRoad" Should have a getCategory function');
      equal(road.getCategory(),'Residential', 'Should return the value corresponding to the "highway" property in the attributes');
  });



  test('Test the createAmenity function', function() {
      expect(1);
      ok(typeof window.Shapes.createAmenity !== 'undefined', 'The Shapes module sould expose a "createAmenity" function');
  });


  test('Test objects created with the  createAmenity function', function() {
      expect(2);
      var amenity = window.Shapes.createAmenity(amenityAttr);
      ok(typeof amenity.getType === 'function', 'Object Created with "createAmenity" Should have a getType function');
      equal(amenity.getType(),'parking', 'Should return the value corresponding to the "amenity" property in the attributes');
  });


  test('Test the createBuilding function', function() {
      expect(1);
      ok(typeof window.Shapes.createBuilding !== 'undefined', 'The Shapes module sould expose a "createBuilding" function');
  });


  test('Test objects created with the  createBuilding function', function() {
      expect(2);
      var building = window.Shapes.createBuilding(buildingAttr);
      ok(typeof building.getArea === 'function', 'Object Created with "createBuilding" Should have a getArea function');
      equal(building.getArea(),10000, 'Should return the area of the building computed from the set of points in the nodes attributes');
  });



  test('Test the createAmenity function', function() {
      expect(1);
      ok(typeof window.Shapes.createNatural !== 'undefined', 'The Shapes module sould expose a "createNatural" function');
  });



  test('Test objects created with the  createNatural function', function() {
      expect(2);
      var natural = window.Shapes.createNatural(naturalAttr);
      ok(typeof natural.getType === 'function', 'Object Created with "createNatural" Should have a getType function');
      equal(natural.getType(),'water', 'Should return the value corresponding to the "natural" property in the attributes');
  });



    /*-----------------------------------*/
    /* PART THREE: Test with a JSON file */
    /*-----------------------------------*/

    // TODO Write the whole test module for testing with the app/data/eure.json file.
   

    var obj;
    module('Asynchronous Unit Test Module', {
        setup: function() {
            stop();

            // You can load a resource before loaching the test...
            $.get('test.json').success(function(data){
                obj = data;
                start();
            });

            // ... Or any asynchroneous task
            // window.setTimeout(function() {
            //     obj = {a:'OK', b:'KO'};
            //     start();
            // }, 1000);

        }
    });



    test('test 1', function() {
        equal(obj.a, 'OK', 'Message');
        equal(obj.a+'KO', 'OKKO', 'Message');
    });





    test('test 2', function() {
        equal(obj.a+obj.b, 'OKKO', 'FAil');
    });


}());