"use client";

import Nav from "@/components/nav";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Mail, Phone, Users2, Heart } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function ContactsPage() {
  const [contacts, setContacts] = useState([
    {
      id: 1,
      name: "Bharath",
      role: "Primary Care Physician",
      phone: "+91 98765 43210",
      email: "bharath@cogniconnect.com",
      relationship: "Doctor"
    },
    {
      id: 2,
      name: "Dinesh",
      role: "Son",
      phone: "+91 97654 32109",
      email: "dinesh@cogniconnect.com",
      relationship: "Family"
    },
    {
      id: 3,
      name: "Kaleesh",
      role: "Colleague",
      phone: "+91 96543 21098",
      email: "kaleesh@cogniconnect.com",
      relationship: "Family"
    },
    {
      id: 4,
      name: "Monish",
      role: "Neighbor",
      phone: "+91 95432 10987",
      email: "monish@cogniconnect.com",
      relationship: "Friend"
    },
    {
      id: 5,
      name: "Narmatha",
      role: "Sister",
      phone: "+91 94321 09876",
      email: "narmatha@cogniconnect.com",
      relationship: "Family"
    },
    {
      id: 6,
      name: "Sachein",
      role: "Brother",
      phone: "+91 93210 98765",
      email: "sachein@cogniconnect.com",
      relationship: "Family"
    },
    {
      id: 7,
      name: "Shawn",
      role: "Friend",
      phone: "+91 92109 87654",
      email: "shawn@cogniconnect.com",
      relationship: "Friend"
    },
    {
      id: 8,
      name: "Vaibhavi",
      role: "Caregiver",
      phone: "+91 91098 76543",
      email: "vaibhavi@cogniconnect.com",
      relationship: "Caregiver"
    },
    {
      id: 9,
      name: "Yasash",
      role: "Friend",
      phone: "+91 90987 65432",
      email: "yasash@cogniconnect.com",
      relationship: "Friend"
    }
  ]);

  const [newContact, setNewContact] = useState({
    name: "",
    role: "",
    phone: "",
    email: "",
    relationship: ""
  });

  const [showAddForm, setShowAddForm] = useState(false);

  const handleAddContact = () => {
    if (newContact.name && newContact.phone) {
      setContacts([
        ...contacts,
        {
          id: contacts.length + 1,
          ...newContact
        }
      ]);
      setNewContact({
        name: "",
        role: "",
        phone: "",
        email: "",
        relationship: ""
      });
      setShowAddForm(false);
    }
  };

  const getRelationshipIcon = (relationship: string) => {
    switch (relationship.toLowerCase()) {
      case "doctor":
        return <Heart className="h-5 w-5 text-red-500" />;
      case "family":
        return <Users2 className="h-5 w-5 text-blue-500" />;
      case "caregiver":
        return <Heart className="h-5 w-5 text-green-500" />;
      case "friend":
        return <Users2 className="h-5 w-5 text-purple-500" />;
      default:
        return <Users2 className="h-5 w-5 text-gray-500" />;
    }
  };

  return (
    <>
      <Nav />
      <main className="min-h-screen bg-background pt-20">
        <div className="container mx-auto max-w-6xl px-4 py-8">
          <div className="mb-8 flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold">Emergency Contacts</h1>
              <p className="mt-2 text-muted-foreground">
                Important people in your support network
              </p>
            </div>
            <Link href="/dashboard">
              <Button variant="outline">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Dashboard
              </Button>
            </Link>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {contacts.map((contact) => (
              <Card key={contact.id} className="hover:shadow-lg transition-shadow">
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-3">
                    {getRelationshipIcon(contact.relationship)}
                    <div>
                      <div className="text-lg font-semibold">{contact.name}</div>
                      <div className="text-sm text-muted-foreground">{contact.role}</div>
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center gap-3">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    <a href={`tel:${contact.phone}`} className="text-blue-600 hover:underline">
                      {contact.phone}
                    </a>
                  </div>
                  {contact.email && (
                    <div className="flex items-center gap-3">
                      <Mail className="h-4 w-4 text-muted-foreground" />
                      <a href={`mailto:${contact.email}`} className="text-blue-600 hover:underline text-sm">
                        {contact.email}
                      </a>
                    </div>
                  )}
                  <div className="mt-3">
                    <span className="inline-block rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                      {contact.relationship}
                    </span>
                  </div>
                </CardContent>
              </Card>
            ))}

            {/* Add New Contact Card */}
            <Card className="border-2 border-dashed border-muted-foreground/25 hover:border-primary/50 transition-colors">
              <CardContent className="flex h-full items-center justify-center p-6">
                {!showAddForm ? (
                  <Button
                    variant="ghost"
                    size="lg"
                    onClick={() => setShowAddForm(true)}
                    className="h-full w-full"
                  >
                    <Users2 className="mr-2 h-6 w-6" />
                    Add New Contact
                  </Button>
                ) : (
                  <div className="w-full space-y-4">
                    <h3 className="text-lg font-semibold">Add Contact</h3>
                    <Input
                      placeholder="Name *"
                      value={newContact.name}
                      onChange={(e) => setNewContact({ ...newContact, name: e.target.value })}
                    />
                    <Input
                      placeholder="Role/Title"
                      value={newContact.role}
                      onChange={(e) => setNewContact({ ...newContact, role: e.target.value })}
                    />
                    <Input
                      placeholder="Phone *"
                      value={newContact.phone}
                      onChange={(e) => setNewContact({ ...newContact, phone: e.target.value })}
                    />
                    <Input
                      placeholder="Email"
                      value={newContact.email}
                      onChange={(e) => setNewContact({ ...newContact, email: e.target.value })}
                    />
                    <Input
                      placeholder="Relationship (Doctor, Family, Friend, etc.)"
                      value={newContact.relationship}
                      onChange={(e) => setNewContact({ ...newContact, relationship: e.target.value })}
                    />
                    <div className="flex gap-2">
                      <Button onClick={handleAddContact} size="sm">
                        Add
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setShowAddForm(false);
                          setNewContact({
                            name: "",
                            role: "",
                            phone: "",
                            email: "",
                            relationship: ""
                          });
                        }}
                      >
                        Cancel
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          <div className="mt-12">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <Heart className="h-6 w-6 text-red-500" />
                  Emergency Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <h4 className="font-semibold text-red-600">Emergency Services</h4>
                    <p className="text-2xl font-bold">112</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-blue-600">Dementia India Alliance Support</h4>
                    <p className="text-xl font-semibold">8585 990 990</p>
                  </div>
                </div>
                <div className="mt-6 rounded-lg bg-yellow-50 dark:bg-yellow-950/30 p-4 border border-yellow-200 dark:border-yellow-800">
                  <h4 className="font-semibold text-yellow-800 dark:text-yellow-200 mb-2">Important Notes</h4>
                  <ul className="text-sm text-yellow-700 dark:text-yellow-300 space-y-1">
                    <li>• Keep this list easily accessible</li>
                    <li>• Update contact information regularly</li>
                    <li>• Share this list with trusted family members</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </>
  );
}