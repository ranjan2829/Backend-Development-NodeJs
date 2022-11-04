import numpy as np                           #IT PERFORMS ADVANCED ARRAYS 
import random
import torch
from torch.functional import Tensor                                #TO SELECT RANDOM ACTION DURING THE BA
import torch.nn as nn                        #IMPORT NEURAL NETWORK MODULE
import torch.nn.functional as F              #IT CONTAINS ALL FUNCTION TO BE IMPORTED IN THE NEURAL NETWORKS---------CONTAINS THE"RELU FUNCTION"
import torch.autograd as autograd #IT CONTAINS THE LOSS CALCULATION FOR BACKPROPAGATION AND IT CONTAINS IT
import os                                    #TO LOAD THE MODEL EACH TIME WITH TRAINED NEURAL NETS (IF AFTER RESUMING THE WORK)
import torch.optim as optim                  #TO CALCULATE THE STOCHASTIC GRADIENT DESCENT WITH THE HELP OF OPTIMIZERS
from torch.autograd import variable          #USED THE CONVERT THE TENSORS(ADVANCED ARRAYS) TO VARIABLE HAVING GRADIENT 




#CREATING OUR AI NEURAL NET ARCHITECTURE
class Network(nn.module):#USING INHERITANCE BY USING ALL THE TOOLS OF THE NN. MODULE
    def __init__(self,input_size,nb_action):     #SELF IS THE THE OBJECT OF THE CODE
        super(Network,self).__init__()       #SUPER FUNCTION TO INHERIT ALL THE TOOLS OF THE NN.MODULE IN NETWORK CLASS LINKING WITH OBJECT SELF
        self.input_size=input_size      #GETTING THE INPUT SIZE OF THE NEURAL NEWORKS
        self.nb_action=nb_action      #GETTING THE ACTION NODES OF BEST Q VALUE BY SOFTMAX FUNCTION FROM THE NEURAL NETWORK
        self.full_connection_1=nn.Linear(input_size,30)    #CREATING FIRST HIDDEN NETWORK BETWEEN INPUT NODES AND FIRST LAYER WITH LINEAR FUNCTION
        self.full_connection_2=nn.Linear(30,nb_action)       #CREATING SECOND HIDDEN NETWORK BETWEEN HIDDEN NODES AND OUTPUT NODES AND LINEAR FUNCTION
    def forward(self,state):   #WE SHALL USE IT TO ACTIVATE OUR NEURAL NETWORK BETWEEN HIDDEN AND OUTPUT NEURONS
        x = F.relu(self.full_connection_1(state))  #FROM FUNCTIONAL TORCH MODULE SHALL IMPORT THE RELU FUNCTION WHICH IS THE RECTIFIER AND ACTIVATES 
        #THE INPUT AND HIDDEN LAYER NEURONS,X CORRESPONDS TO THE HIDDEN LAYER TO ACTIVATE IT 
        q_values = self.full_connection_2(x) # Q_VALUES IS THE FINAL OUTPUT OF THE CONNECTION AND TO ACTIVATE IT USED THE RELU FUNCTION FOR CONNECTION 
        #BETWEEN SECOND CONNECTION SO SO THAT I GOES FROM HIDDEN LAYER TO OUTPUT LAYER AND HIDDEN LAYER IS THE "X",
        return q_values #RETURNS THE Q VALUES SELECTED
#EXPIRIENCE REPLAY --BASED ON MARKOV DESCISION PROCESS
class ReplayMemory(object):         #CREATING THE MEMORY REPLAY CLASS BY CONSIDERING HISTORICAL TRANSTIONS
    def __init__(self,capacity):      #VARIABLE THAT WILL BE ATTACHED TO FUTURE INSTANCES(OBJECT THAT WILL BE CREATED IN FUTURE) OF CLASS -__INIT__
        self.capacity=capacity        #CAPACITY OBJECT
        self.memory=[]#INITIALISING MEMORY
    def push(self,event):   #CREATING PUSH FUNCTION TO DEL EXTENDED MEMORY AND UPDATE NEW SAMPLES
        self.memory.append(event)#APPENDING THE LATEST EVENT
        #CHECKING CAPACITY AND DELETING OLD TRANSITION DATA 
        if len(self.memory)>self.capacity:
            del self.memory[0]#IF CONDITION TURNS OK THEN DELETE  FUNCTIOIN ACTION
    def sample(self,batch_size):#it's the function to import random samples from the memory
        sample = zip(*random.sample(self.memory,batch_size))#in this line of the code we import random sample from self.memory that has
        # fixed size of batch size
        #zip function reshapes our list in following way= list=((1,2,3),(4,5,6)) then zip(*list)= ((1,4),(2,3),(5,6))
        #it's helps in segregating the state , action and , reward making easy for algorithm
        return map(lambda x: Variable(torch.cat(x,0)),sample)
        # map function maps the samples from memory to torch variables and "x" is the name of variable
        #Variable function will covert the torch variables into tensors and gradient
        #torch.cat() function will concatnenate in the first dimension , into the states()
        #applying lambda to samples
        ########################################################################################################################################
#IMPLEMENTING DEEP-Q-LEARNING
class Dqn():#creating the deep q network class and also it will intialise the variables
    def __init__(self,input_size,nb_action,gamma):
        self.gamma=gamma
        self.reward_window=[]#it's the mean of last 100 reward to measure the performance of AI agent
        self.model= Network(input_size,nb_action)#this will be the object of Network class and it will create one neural network of dqn class
        self.memory=ReplayMemory(100000)#actual parameter is of formal parameter of replaymemory class capacity , will remember 100000 
        #will samples some random trasition , that's why it will learn
        self.optimizers = optim.Adam(self.model.parameter(),lr=0.001)#self.model,optimizer to connect neural network to optim.adam ,learning rate
        self.last_state=torch.Tensor(input_size).unsqueeze(0)             #has 5 dimensions of 3 sensor and rientation =-
        #pytorch wants torch tensors and not merely only 5 dimensions and also in batch to insert last state into neural network
        self.last_Action=0
        self.last_Reward=0
    def select_Action(self,state):
        probs=F.softmax(self.model(Variable(state,volatile=True))*7)#in order to convert torch tensor to torch variable we use variable function 
        #and also cancel out the gradient associated with the torch tensor by paramemter volatile=True
        #T=7 , higher the temperature parameter higher the assurance of neural network to higher probabilties of q values
        #softmax([1,2,3]), so softmax([0.4,0.11,0.85]*3)=softmax([0,0.2,0.98]), 
        # increasing temperature helps in best selection of q values with higher probabilties
        #softmax generates probability distribution of each q values
        action=probs.multinomial()#multinomial gives the random draw between probabilties and helps select the action from above distribution
        return action.data[0,0]
    def learn(self,batch_state,batch_next_state,batch_reward,batch_action):
        outputs= self.model(batch_state).gather(1,batch_action.unsqueez(1)).squeeze(1)
        next_outputs= self.model(batch_next_state).detach().max(1)[0]
        target= self.gamma*next_outputs + batch_reward
        td_loss = F.smooth_l1_loss(outputs,target)#smooth_l1_loss is heuber loss function to calculate the loss 
        self.optimizers.zero_grad()#zero_grad reintializes the loop after every interation 
        td_loss.backward(retain_variables = True)#retain_variable frees the memory and improve the performance
        self.optimizers.step()#backpropagation takes by this line of code
    def update(self,reward,new_signal):
        new_state=torch.Tensor(new_signal).float().unsqueeze(0)
        self.memory.push(self.last_state,new_state,torch.LongTensor([int(self.last_Action)]),torch.Tensor(self.last_reward))
        action = self.select_Action(new_state)
        if len(self.memory.memory)>100:
            batch_state,batch_next_state,batch_reward,batch_action = self.memory.sample(100)
            self.learn(batch_state,batch_next_state,batch_reward,batch_action)
        self.last_action=action
        self.last_state=new_state
        self.last_reward=reward
        self.reward_window.append(reward)
        if len(self.reward_window)>1000:
            del self.reward.window[0]
        return action
    def score(self):
        return sum(self.reward_window)/(len(self.reward_window+1))
    def save(self):
        torch.save({'state_dict':self.model.state_dict(),'optimizer':self.optimizers.state_dict()},'last_brain.pth')
    def load(self):
        if os.path.isfile('last_brain.pth'):
            print("=> loading check point")
            checkpoint = torch.load('last_brain.pth')
            self.model.load_state_dict(checkpoint['state_dict'])
            self.optimizers.load_state_dict(checkpoint['optimizer'])
            print("done")
        else:
            print("no checkpoint found")
#DONE!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!




               