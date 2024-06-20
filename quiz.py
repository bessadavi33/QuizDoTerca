import tkinter as tk
from tkinter import messagebox

# Função para cadastrar perguntas de múltipla escolha
def cadastrar():
    pergunta = entry_pergunta.get()
    opcoes = [entry_opcao1.get(), entry_opcao2.get(), entry_opcao3.get(), entry_opcao4.get()]
    resposta_correta = entry_resposta_correta.get()

    if pergunta and all(opcoes) and resposta_correta in opcoes:
        with open("perguntas_multiplas.txt", "a") as file:
            file.write(f"{pergunta}::{','.join(opcoes)}::{resposta_correta}\n")
        messagebox.showinfo("Sucesso", "Pergunta de múltipla escolha cadastrada com sucesso!")
        entry_pergunta.delete(0, tk.END)
        entry_opcao1.delete(0, tk.END)
        entry_opcao2.delete(0, tk.END)
        entry_opcao3.delete(0, tk.END)
        entry_opcao4.delete(0, tk.END)
        entry_resposta_correta.delete(0, tk.END)
    else:
        messagebox.showwarning("Erro", "Por favor, preencha todos os campos e certifique-se de que a resposta correta está entre as opções.")

# Função para abrir a tela de cadastro de perguntas de múltipla escolha
def abrir_tela_cadastro():
    tela_cadastro = tk.Toplevel(root)
    tela_cadastro.title("Cadastrar Pergunta de Múltipla Escolha")

    tk.Label(tela_cadastro, text="Pergunta:").grid(row=0, column=0)
    global entry_pergunta
    entry_pergunta = tk.Entry(tela_cadastro, width=50)
    entry_pergunta.grid(row=0, column=1)

    tk.Label(tela_cadastro, text="Opção 1:").grid(row=1, column=0)
    global entry_opcao1
    entry_opcao1 = tk.Entry(tela_cadastro, width=50)
    entry_opcao1.grid(row=1, column=1)

    tk.Label(tela_cadastro, text="Opção 2:").grid(row=2, column=0)
    global entry_opcao2
    entry_opcao2 = tk.Entry(tela_cadastro, width=50)
    entry_opcao2.grid(row=2, column=1)

    tk.Label(tela_cadastro, text="Opção 3:").grid(row=3, column=0)
    global entry_opcao3
    entry_opcao3 = tk.Entry(tela_cadastro, width=50)
    entry_opcao3.grid(row=3, column=1)

    tk.Label(tela_cadastro, text="Opção 4:").grid(row=4, column=0)
    global entry_opcao4
    entry_opcao4 = tk.Entry(tela_cadastro, width=50)
    entry_opcao4.grid(row=4, column=1)

    tk.Label(tela_cadastro, text="Resposta Correta:").grid(row=5, column=0)
    global entry_resposta_correta
    entry_resposta_correta = tk.Entry(tela_cadastro, width=50)
    entry_resposta_correta.grid(row=5, column=1)

    tk.Button(tela_cadastro, text="Cadastrar", command=cadastrar).grid(row=6, column=1)

# Função para responder perguntas
def responder_perguntas():
    with open("perguntas_multiplas.txt", "r") as file:
        perguntas = file.readlines()

    if not perguntas:
        messagebox.showinfo("Info", "Nenhuma pergunta cadastrada.")
        return

    for linha in perguntas:
        pergunta, opcoes, resposta_correta = linha.strip().split("::")
        opcoes = opcoes.split(',')

        def check_answer():
            if selected_option.get() == resposta_correta:
                messagebox.showinfo("Correto!", "Você acertou!")
            else:
                messagebox.showwarning("Errado!", f"Resposta incorreta. A resposta correta é: {resposta_correta}")
            question_window.destroy()

        question_window = tk.Toplevel(root)
        question_window.title("Responder Pergunta")

        tk.Label(question_window, text=pergunta).pack()

        selected_option = tk.StringVar(value=None)

        for opcao in opcoes:
            tk.Radiobutton(question_window, text=opcao, variable=selected_option, value=opcao).pack(anchor=tk.W)

        tk.Button(question_window, text="Enviar", command=check_answer).pack()

# Configuração da janela principal
root = tk.Tk()
root.title("Aplicativo de Perguntas de Múltipla Escolha")

tk.Button(root, text="Cadastrar Perguntas de Múltipla Escolha", command=abrir_tela_cadastro).pack(pady=20)
tk.Button(root, text="Responder Perguntas", command=responder_perguntas).pack(pady=20)

root.mainloop()
