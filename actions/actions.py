from rasa_sdk import Action
from rasa_sdk.events import SessionStarted, ActionExecuted, EventType

class ActionSessionStart(Action):
    def name(self) -> str:
        return "action_session_start"

    async def run(self, dispatcher, tracker, domain) -> list[EventType]:
        # Démarre une nouvelle session
        events = [SessionStarted()]
        
        # Envoie le message de bienvenue
        dispatcher.utter_message(response="utter_greet")
        
        # Attend la prochaine interaction
        events.append(ActionExecuted("action_listen"))
        
        return events
