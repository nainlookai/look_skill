/* eslint-disable no-use-before-define */
/* eslint-disable global-require */

const Alexa = require('ask-sdk-core');

const featureWords = [
  {
    "id": "1",
    "name": {
      "value": "emergency",
      "synonyms": [
      ]
    }
  },
  {
    "id": "2",
    "name": {
      "value": "papers",
      "synonyms": [
      ]
    }
  },
  {
    "id": "3",
    "name": {
      "value": "shopping",
      "synonyms": [
      ]
    }
  },
  {
    "id": "4",
    "name": {
      "value": "accessories",
      "synonyms": [
      ]
    }
  },
  {
    "id": "5",
    "name": {
      "value": "self",
      "synonyms": [
      ]
    }
  }
];

const LaunchRequestHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'LaunchRequest';
  },
  handle(handlerInput) {

    console.log(JSON.stringify(featureWords));

    featureWords.forEach(word => {
      console.log('word: ', JSON.stringify(word));
      console.log(word.name.value);
    });

    const featureWordEntities = {
      type: "Dialog.UpdateDynamicEntities",
      updateBehavior: "REPLACE",
      types: [
        {
          name: "featureWordType",
          values: featureWords
        }
      ]
    };

    const speechText = "Welcome to Look Platform. Look is a skill marketplace where you can add voice interfaces to your business.";
    // const speechText = "Welcome to Look's Connected Car Platform. I can assist you during an emergency, renew your car papers, connect with your accessories, shop the store on the go, and even park your car for you.";

    return handlerInput.responseBuilder
      .addDirective(featureWordEntities)
      .speak(speechText)
      .reprompt(speechText)
      .getResponse();
  }
};

// handlerInput.requestEnvelope.request.type === 'LaunchRequest'
//       ||
const LookDataHandler = {
  canHandle(handlerInput) {
    return (handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && handlerInput.requestEnvelope.request.intent.name === 'LookDataHandler');
  },
  async handle(handlerInput) {

    const response = handlerInput.responseBuilder;

    const slotSDValue = getStaticAndDynamicSlotValuesFromSlot(handlerInput.requestEnvelope.request.intent.slots.featureWord);

    // let result = `${slotSDValue.value} is not the secret word. Sorry.`;

    // If Feature not supported
    let result = `${slotSDValue.value} is not the currently supported. Sorry.`;

    if (slotSDValue.value === "emergency") {
      if (slotSDValue.dynamic.statusCode === 'ER_SUCCESS_MATCH') {
        result = `Nice job. Recognized emergency. Congratulations. ${slotSDValue.value} is correct.  I sent your discount to your Alexa app. Show it anytime this week for a 20% discount.`;
        response.withSimpleCard(
          "20% Discount",
          `Congratulations! You guessed our secret word '${slotSDValue.value}'. \r\nShow this for a 20% discount anytime this week.`);
      }
    } else if (slotSDValue.value === "shopping") {
      if (slotSDValue.dynamic.statusCode === 'ER_SUCCESS_MATCH') {
        result = `Nice job. recognized shopping Congratulations. ${slotSDValue.value} is correct.  I sent your discount to your Alexa app. Show it anytime this week for a 20% discount.`;
        response.withSimpleCard(
          "20% Discount",
          `Congratulations! You guessed our secret word '${slotSDValue.value}'. \r\nShow this for a 20% discount anytime this week.`);
      }
    } else if (slotSDValue.value === "self") {
      if (slotSDValue.dynamic.statusCode === 'ER_SUCCESS_MATCH') {
        result = `Nice job. recognized self Congratulations. ${slotSDValue.value} is correct.  I sent your discount to your Alexa app. Show it anytime this week for a 20% discount.`;
        response.withSimpleCard(
          "20% Discount",
          `Congratulations! You guessed our secret word '${slotSDValue.value}'. \r\nShow this for a 20% discount anytime this week.`);
      }
    } else if (slotSDValue.value === "papers") {
      if (slotSDValue.dynamic.statusCode === 'ER_SUCCESS_MATCH') {
        result = `Nice job. recognized papers Congratulations. ${slotSDValue.value} is correct.  I sent your discount to your Alexa app. Show it anytime this week for a 20% discount.`;
        response.withSimpleCard(
          "20% Discount",
          `Congratulations! You guessed our secret word '${slotSDValue.value}'. \r\nShow this for a 20% discount anytime this week.`);
      }
    } else if (slotSDValue.value === "accessories") {
      if (slotSDValue.dynamic.statusCode === 'ER_SUCCESS_MATCH') {
        result = `Nice job. recognized accessories Congratulations. ${slotSDValue.value} is correct.  I sent your discount to your Alexa app. Show it anytime this week for a 20% discount.`;
        response.withSimpleCard(
          "20% Discount",
          `Congratulations! You guessed our secret word '${slotSDValue.value}'. \r\nShow this for a 20% discount anytime this week.`);
      }
    }

    const speechText = `${result}.`;

    /**
        let outputSpeech = 'This is the default message.';
    // http://api.open-notify.org/astros.json
        await getRemoteData('https://api.nturing.com/v1/actiontype/list')
          .then((response) => {
            const welcome = "Welcome to Look's Connected Car Platform";
    
            outputSpeech = welcome;
            const data = JSON.parse(response);
            outputSpeech = `There are currently ${data.length} astronauts in space. `
            
            
            // outputSpeech = `There are currently ${data.people.length} astronauts in space. `;
            // for (let i = 0; i < data.people.length; i += 1) {
            //   if (i === 0) {
            //     // first record
            //     outputSpeech = `${outputSpeech}Their names are: ${data.people[i].name}, `;
            //   } else if (i === data.people.length - 1) {
            //     // last record
            //     outputSpeech = `${outputSpeech}and ${data.people[i].name}.`;
            //   } else {
            //     // middle record(s)
            //     outputSpeech = `${outputSpeech + data.people[i].name}, `;
            //   }
            // }
            
          })
          .catch((err) => {
            console.log(`ERROR: ${err.message}`);
            // set an optional error message here
            // outputSpeech = err.message;
          });
    
        return handlerInput.responseBuilder
          .speak(outputSpeech)
          .getResponse();
        */
    return response
      .speak(speechText)
      //.reprompt('add a reprompt if you want to keep the session open for the user to respond')
      .getResponse();
  }
};

const HelpIntentHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && handlerInput.requestEnvelope.request.intent.name === 'AMAZON.HelpIntent';
  },
  handle(handlerInput) {
    const speechText = 'You can try to say Alexa I am in emergency or Alexa check for shopping offers on my route.';

    return handlerInput.responseBuilder
      .speak(speechText)
      .reprompt(speechText)
      .getResponse();
  },
};

const CancelAndStopIntentHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && (handlerInput.requestEnvelope.request.intent.name === 'AMAZON.CancelIntent'
        || handlerInput.requestEnvelope.request.intent.name === 'AMAZON.StopIntent');
  },
  handle(handlerInput) {
    const speechText = 'Goodbye. Have a safe journey!';

    return handlerInput.responseBuilder
      .speak(speechText)
      .getResponse();
  },
};

const SessionEndedRequestHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'SessionEndedRequest';
  },
  handle(handlerInput) {
    console.log(`Session ended with reason: ${handlerInput.requestEnvelope.request.reason}`);

    return handlerInput.responseBuilder.getResponse();
  },
};

const IntentReflectorHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest';
  },
  handle(handlerInput) {
    const intentName = handlerInput.requestEnvelope.request.intent.name;
    const speechText = `The intent named: '${intentName}' doesn't have an intent handler. Try saying something else.`;

    return handlerInput.responseBuilder
      .speak(speechText)
      .reprompt('Try saying something else.')
      .getResponse();
  }
};

const ErrorHandler = {
  canHandle() {
    return true;
  },
  handle(handlerInput, error) {
    console.log(`Error handled: ${error.message}`);

    return handlerInput.responseBuilder
      .speak('Sorry, I can\'t understand the command. Please say again.')
      .reprompt('Sorry, I can\'t understand the command. Please say again.')
      .getResponse();
  },
};

const getStaticAndDynamicSlotValues = function (slots) {
  const slotValues = {}
  for (let slot in slots) {
    slotValues[slot] = getStaticAndDynamicSlotValuesFromSlot(slots[slot]);
  }
  return slotValues;
}

const getStaticAndDynamicSlotValuesFromSlot = function (slot) {

  const result = {
    name: slot.name,
    value: slot.value
  };

  if (((slot.resolutions || {}).resolutionsPerAuthority || [])[0] || {}) {
    slot.resolutions.resolutionsPerAuthority.forEach((authority) => {
      const slotValue = {
        authority: authority.authority,
        statusCode: authority.status.code,
        synonym: slot.value || undefined,
        resolvedValues: slot.value
      };
      if (authority.values && authority.values.length > 0) {
        slotValue.resolvedValues = [];

        authority.values.forEach((value) => {
          slotValue.resolvedValues.push(value);
        });

      }

      if (authority.authority.includes('amzn1.er-authority.echo-sdk.dynamic')) {
        result.dynamic = slotValue;
      } else {
        result.static = slotValue;
      }
    });
  }
  return result;
};

const getRemoteData = (url) => new Promise((resolve, reject) => {
  const client = url.startsWith('https') ? require('https') : require('http');
  const request = client.get(url, (response) => {
    if (response.statusCode < 200 || response.statusCode > 299) {
      reject(new Error(`Failed with status code: ${response.statusCode}`));
    }
    const body = [];
    response.on('data', (chunk) => body.push(chunk));
    response.on('end', () => resolve(body.join('')));
  });
  request.on('error', (err) => reject(err));
});

const FallbackIntentHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && handlerInput.requestEnvelope.request.intent.name === 'AMAZON.FallbackIntent';
  },
  handle(handlerInput) {
    const speechText = 'Sorry I didn\'t get that. To check for the papers word say something like. Check my papers for my car - and then a paper name or If your car has broken down, say something like. Where is the nearest gas station ?';

    return handlerInput.responseBuilder
      .speak(speechText)
      .reprompt(speechText)
      .getResponse();
  }
};

const skillBuilder = Alexa.SkillBuilders.custom();

exports.handler = skillBuilder
  .addRequestHandlers(
    LaunchRequestHandler,
    LookDataHandler,
    HelpIntentHandler,
    CancelAndStopIntentHandler,
    SessionEndedRequestHandler,
    FallbackIntentHandler,
    IntentReflectorHandler
  )
  .addErrorHandlers(ErrorHandler)
  .lambda();
