from rasa_sdk import Action
from rasa_sdk.events import EventType

class ActionWelcomeMessage(Action):
    def name(self) -> str:
        return "action_welcome_message"

    def run(self, dispatcher, tracker, domain) -> list[EventType]:
        dispatcher.utter_message(text="Bonjour 👋, Je suis ton FSAC Assistant. Comment puis-je vous aider ?")
        return []
