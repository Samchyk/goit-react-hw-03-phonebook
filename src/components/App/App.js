import React, { Component } from 'react';
import Filter from 'components/Filter/Filter';
import ContactForm from 'components/ContactForm/ContactForm';
import ContactList from 'components//ContactList/ContactList';

class App extends Component {
   state = {
      contacts: [
         { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
         { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
         { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
         { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
      ],
      filter: '',
   };

   componentDidMount() {
      const contacts = JSON.parse(localStorage.getItem('contacts'));
      contacts && this.setState({ contacts });
   }
   componentDidUpdate(prevState) {
      const nextState = this.state.contacts;
      if (prevState.contacts !== nextState) {
         localStorage.setItem('contacts', JSON.stringify(nextState));
      }
   }
   addContact = newContact => {
      this.setState(prevState => ({
         contacts: [...prevState.contacts, newContact],
      }));
   };

   onChangeFilter = async e => {
      await this.setState({ filter: e.target.value });
   };
   deleteContact = id => {
      this.setState(prevState => ({
         contacts: prevState.contacts.filter(contact => contact.id !== id),
      }));
   };

   render() {
      const { contacts, filter } = this.state;
      const normFilter = filter.toLocaleLowerCase();
      const visibleContacts = contacts.filter(contact =>
         contact.name.toLocaleLowerCase().includes(normFilter)
      );

      return (
         <div>
            <h1>Phonebook</h1>
            <ContactForm
               addContact={this.addContact}
               visibleContacts={visibleContacts}
            />
            <h2>Contacts</h2>
            <Filter filter={filter} onChange={this.onChangeFilter} />
            <ContactList
               visibleContacts={visibleContacts}
               deleteContact={this.deleteContact}
            />
         </div>
      );
   }
}

export default App;
