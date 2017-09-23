const events = [
    {
      "action": "registratie",
      "response": "ok",
      "data": {
        "beslagene": {
          "naam": "Harold Heethoofd",
          "geboorte_datum": "1981-08-22"
        },
        "object": {
          "type": "auto",
          "kenteken": "TK-ZX-72",
          "merk": "BMW",
          "kleur": "zwart",
          "foto": "http://image.autotrader.nl/media/135317866-medium.jpg"
        }
      },
      "timestamp": "2017-09-22T14:51:00+0200",
      "version": "20170923"
    },
    {
      "action": "transport",
      "response": "ok",
      "data": {
        "locatie": {
          "lat": "52.0661263",
          "lng": "4.356196"
        }
      },
      "timestamp": "2017-09-22T15:19:00+0200",
      "version": "20170923"
    },
    {
      "action": "ketenbeslaghuis_ontvangst",
      "response": "ok",
      "data": {
        "locatie": {
          "lat": "52.0463866",
          "lng": "4.2509162"
        }
      },
      "timestamp": "2017-09-22T15:45:00+0200",
      "version": "20170923"
    },
    {
      "action": "ketenbeslaghuis_onderzoeksresultaten",
      "response": "ok",
      "data": {
        "locatie": {
          "lat": "52.0463866",
          "lng": "4.2509162"
        }
      },
      "timestamp": "2017-09-22T16:45:00+0200",
      "version": "20170923"
    },
    {
      "action": "besluit_openbaar_ministerie",
      "response": "vervreemden",
      "data": {
        "besluit": "De auto wordt vervreemd."
      },
      "timestamp": "2017-09-22T17:05:00+0200",
      "version": "20170923"
    },
    {
      "action": "bericht_vervreemden",
      "response": "ok",
      "data": {},
      "timestamp": "2017-09-22T17:06:00+0200",
      "version": "20170923"
    },
    {
      "action": "taxatie",
      "response": "ok",
      "data": {
        "waarde": "38000"
      },
      "timestamp": "2017-09-23T11:05:00+0200",
      "version": "20170923"
    }
];

const scenarioVersion = {
  "title": "Inbeslagname",
  "actors": {
    "politie": {
      "title": "Politie"
    },
    "forensisch_opsporingsteam": {
      "title": "Forensisch opsporingsteam"
    },
    "officier_van_justitie": {
      "title": "Officier van Justitie"
    },
    "beslag_coordinator": {
      "title": "Beslag coördinator (OM)"
    },
    "transport": {
      "title": "Transport"
    },
    "bewaarder": {
      "title": "Bewaarder domeinen"
    },
    "digi": {
      "title": "Digi"
    },
    "beslagene": {
      "title": "Beslagene"
    },
    "ketenbeslaghuis": {
      "title": "Ketenbeslaghuis"
    }
  },
  "start": "registratie",
  "actions": {
    "registratie": {
      "definition": "registration",
      "title": "Registratie van beslag",
      "actor": "politie",
      "responses": {
        "ok": {
          "transition": "transport",
          "update": {
             "object": "object",
             "beslagene.naam": "actors.beslagene.naam",
             "beslagene.geboorte_datum": "actors.beslagene.geboorte_datum"
          }
        }
      }
    },
    "transport": {
      "definition": "acknowlegde",
      "title": "De transport heeft het object is ontvangen",
      "actor": "transport",
      "responses": {
        "ok": {
          "update": {
            "locatie": "locatie"
          },
          "transition": "ketenbeslaghuis_ontvangst"
        }
      }
    },
    "ketenbeslaghuis_ontvangst": {
      "definition": "acknowlegde",
      "title": "Het ketenhuis heeft het object ontvangen",
      "actor": "ketenbeslaghuis",
      "responses": {
        "ok": {
          "update": {
            "locatie": "locatie"
          },
          "transition": "ketenbeslaghuis_onderzoeksresultaten"
        }
      }
    },
    "ketenbeslaghuis_onderzoeksresultaten": {
      "definition": "document",
      "title": "Onderzoek ketenbeslaghuis",
      "actor": "ketenbeslaghuis",
      "responses": {
        "ok": {
          "transition": "besluit_openbaar_ministerie",
          "update": "onderzoeksresultaten.ketenbeslaghuis"
        },
        "error": {
          "transition": ":failed"
        }
      }
    },
    "forensisch_opsporingsteam_ontvangst": {
      "definition": "acknowledge",
      "title": "Het forensisch opsporingsteam heeft het object ontvangen",
      "actor": "forensisch_opsporingsteam",
      "responses": {
        "ok": {
          "transition": "forensisch_onderzoeksresultaten"
        }
      }
    },
    "forensisch_onderzoeksresultaten": {
      "definition": "document",
      "title": "Forensisch onderzoek",
      "actor": "forensisch_opsporingsteam",
      "responses": {
        "ok": {
          "transition": "besluit_officier_van_justitie",
          "update": "onderzoeksresultaten.forensisch_opsporingsteam"
        }
      }
    },
    "besluit_officier_van_justitie": {
      "definition": "choice",
      "title": "De officier van justitie maakt een besluit tot gevolgen met betrekking tot goed",
      "actor": "officier_van_justitie",
      "responses": {
        "ok": {
          "transition": "trigger_response_main_process",
          "update": "besluit"
        },
        "onttrekking": {
          "transition": "onttrekking_ontvangst",
          "update": "besluit"
        },
        "research": {
          "transition": "digi_ontvangst",
          "update": "besluit"
        }
      }
    },
    "digi_ontvangst": {
      "definition": "acknowledge",
      "description": "Digi heeft het object ontvangen",
      "actor": "digi",
      "responses": {
        "ok": {
          "transition": "digi_voltooid"
        }
      }
    },
    "digi_voltooid": {
      "definition": "acknowledge",
      "title": "Digi procedure",
      "description": "Digi procedure is voltooid",
      "actor": "digi",
      "responses": {
        "ok": {
          "transition": "besluit_officier_van_justitie"
        }
      }
    },
    "onttrekking_ontvangst": {
      "definition": "acknowledge",
      "title": "Bevestig ontvangst door Officier van Justitie",
      "actor": "forensisch_opsporingsteam",
      "responses": {
        "ok": {
          "transition": "onttrekking"
        }
      }
    },
    "onttrekking": {
      "definition": "acknowledge",
      "title": "Het object is vernietigd",
      "actor": "forensisch_opsporingsteam",
      "responses": {
        "ok": {
          "transition": ":success"
        }
      }
    },
    "besluit_openbaar_ministerie": {
      "definition": "choice",
      "title": "Het openbaar ministerie maakt een besluit tot gevolgen met betrekking tot goed",
      "actor": "beslag_coordinator",
      "responses": {
        "ok": {
          "transition": "teruggave",
          "update": "besluit"
        },
        "vervreemden": {
          "transition": "bericht_vervreemden",
          "update": "besluit"
        }
      },
      "display": true
    },
    "bericht_vervreemden": {
      "title": "De beslagene is bericht van vervreemding",
      "actor": "beslag_coordinator",
      "responses": {
        "ok": {
          "transition": "taxatie"
        }
      },
      "display": true
    },
    "taxatie": {
      "definition": "document",
      "title": "Taxatie",
      "actor": "bewaarder",
      "responses": {
        "ok": {
          "transition": "mogelijkheid_terugkoop",
          "update": {
            "select": "taxatie"
          }
        }
      }
    },
    "mogelijkheid_terugkoop": {
      "definition": "choice",
      "title": "De beslagene krijg de mogelijkheid het goed terug te kopen tegen taxatiewaarde",
      "actor": "beslagene",
      "timeout": "14d",
      "responses": {
        "ok": {
          "transition": "betaling_terugkoop"
        },
        "veilen": {
          "transition": "veilen"
        },
        "time": {
          "transition": "veilen"
        }
      }
    },
    "betaling_terugkoop": {
      "definition": "payment",
      "title": "De beslagene heeft betaald voor terugkoop",
      "actor": "beslagene",
      "timeout": "3d",
      "responses": {
        "ok": {
          "transition": "teruggave",
          "update": "verkoop"
        },
        "timeout": {
          "transition": "veilen"
        }
      }
    },
    "teruggave": {
      "definition": "acknowledge",
      "title": "Ontvangst teruggave",
      "description": "Bevestiging van ontvangst van goed door beslagene",
      "internal_description": "Bevestig dat u het goed heeft ontvangen",
      "actor": "beslagene",
      "responses": {
        "ok": {
          "label": "Bevestigen",
          "transition": ":success"
        }
      },
      "display": true
    },
    "veilen": {
      "definition": "document",
      "title": "Veiling van het goed",
      "actor": "bewaarder",
      "responses": {
        "ok": {
          "transition": "overdracht",
          "update": {
            "select": "veiling"
          }
        },
        "error": {
          "transition": ":failed"
        }
      }
    },
    "overdracht": {
      "definition": "acknowledge",
      "title": "Bevestiging van overdracht aan nieuwe eigenaar",
      "actor": "bewaarder",
      "responses": {
        "ok": {
          "label": "Bevestigen",
          "transition": ":success"
        }
      }
    }
  }
};

const scenario = {
    getVersion: () => Promise.resolve(scenarioVersion)
};

// ----

const project = require('./project');

project(events, scenario, x => Promise.resolve(x))
    .then(projection => console.log(JSON.stringify(projection, null, 2)))
    .catch(err => console.log(err));
