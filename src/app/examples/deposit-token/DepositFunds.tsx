// page.tsx
'use client'
import React, { useState, useEffect } from 'react'
import H1 from '../components/H1'
import TokenInput from '../components/TokenInput'
import RecipientInput from '../components/RecipientInput'
import Button from '../components/Button'
import BalanceDisplay from '../components/BalanceDisplay'
import TokenAmountInput from '../components/TokenAmountInput'
import Allowance from '../components/Allowance'

import {
  useAccount,
  useWriteContract,
  useSimulateContract,
  useWaitForTransactionReceipt,
  useContractRead,
  useBalance,
} from 'wagmi'
import { useToast } from '@/context/Toaster'
import { useChainId } from 'wagmi'
import { useWeb3Modal } from '@web3modal/wagmi/react'
import { ethers } from 'ethers'
const fundAbi = [
  {
    inputs: [
      {
        internalType: 'address',
        name: 'target',
        type: 'address',
      },
    ],
    name: 'AddressEmptyCode',
    type: 'error',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'account',
        type: 'address',
      },
    ],
    name: 'AddressInsufficientBalance',
    type: 'error',
  },
  {
    inputs: [],
    name: 'AlreadyRegisteredSubnet',
    type: 'error',
  },
  {
    inputs: [],
    name: 'CallFailed',
    type: 'error',
  },
  {
    inputs: [],
    name: 'CannotReleaseZero',
    type: 'error',
  },
  {
    inputs: [],
    name: 'FailedInnerCall',
    type: 'error',
  },
  {
    inputs: [],
    name: 'InsufficientFunds',
    type: 'error',
  },
  {
    inputs: [],
    name: 'InvalidActorAddress',
    type: 'error',
  },
  {
    inputs: [
      {
        internalType: 'enum InvalidXnetMessageReason',
        name: 'reason',
        type: 'uint8',
      },
    ],
    name: 'InvalidXnetMessage',
    type: 'error',
  },
  {
    inputs: [
      {
        internalType: 'string',
        name: 'reason',
        type: 'string',
      },
    ],
    name: 'MethodNotAllowed',
    type: 'error',
  },
  {
    inputs: [],
    name: 'NotEmptySubnetCircSupply',
    type: 'error',
  },
  {
    inputs: [],
    name: 'NotEnoughFunds',
    type: 'error',
  },
  {
    inputs: [],
    name: 'NotEnoughFundsToRelease',
    type: 'error',
  },
  {
    inputs: [],
    name: 'NotRegisteredSubnet',
    type: 'error',
  },
  {
    inputs: [],
    name: 'ReentrancyError',
    type: 'error',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'token',
        type: 'address',
      },
    ],
    name: 'SafeERC20FailedOperation',
    type: 'error',
  },
  {
    inputs: [],
    name: 'UnexpectedSupplySource',
    type: 'error',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'uint256',
        name: 'epoch',
        type: 'uint256',
      },
      {
        components: [
          {
            components: [
              {
                internalType: 'uint64',
                name: 'root',
                type: 'uint64',
              },
              {
                internalType: 'address[]',
                name: 'route',
                type: 'address[]',
              },
            ],
            internalType: 'struct SubnetID',
            name: 'subnetID',
            type: 'tuple',
          },
          {
            internalType: 'uint256',
            name: 'blockHeight',
            type: 'uint256',
          },
          {
            components: [
              {
                internalType: 'enum IpcMsgKind',
                name: 'kind',
                type: 'uint8',
              },
              {
                components: [
                  {
                    components: [
                      {
                        internalType: 'uint64',
                        name: 'root',
                        type: 'uint64',
                      },
                      {
                        internalType: 'address[]',
                        name: 'route',
                        type: 'address[]',
                      },
                    ],
                    internalType: 'struct SubnetID',
                    name: 'subnetId',
                    type: 'tuple',
                  },
                  {
                    components: [
                      {
                        internalType: 'uint8',
                        name: 'addrType',
                        type: 'uint8',
                      },
                      {
                        internalType: 'bytes',
                        name: 'payload',
                        type: 'bytes',
                      },
                    ],
                    internalType: 'struct FvmAddress',
                    name: 'rawAddress',
                    type: 'tuple',
                  },
                ],
                internalType: 'struct IPCAddress',
                name: 'to',
                type: 'tuple',
              },
              {
                components: [
                  {
                    components: [
                      {
                        internalType: 'uint64',
                        name: 'root',
                        type: 'uint64',
                      },
                      {
                        internalType: 'address[]',
                        name: 'route',
                        type: 'address[]',
                      },
                    ],
                    internalType: 'struct SubnetID',
                    name: 'subnetId',
                    type: 'tuple',
                  },
                  {
                    components: [
                      {
                        internalType: 'uint8',
                        name: 'addrType',
                        type: 'uint8',
                      },
                      {
                        internalType: 'bytes',
                        name: 'payload',
                        type: 'bytes',
                      },
                    ],
                    internalType: 'struct FvmAddress',
                    name: 'rawAddress',
                    type: 'tuple',
                  },
                ],
                internalType: 'struct IPCAddress',
                name: 'from',
                type: 'tuple',
              },
              {
                internalType: 'uint64',
                name: 'nonce',
                type: 'uint64',
              },
              {
                internalType: 'uint256',
                name: 'value',
                type: 'uint256',
              },
              {
                internalType: 'bytes',
                name: 'message',
                type: 'bytes',
              },
            ],
            internalType: 'struct IpcEnvelope[]',
            name: 'msgs',
            type: 'tuple[]',
          },
        ],
        indexed: false,
        internalType: 'struct BottomUpMsgBatch',
        name: 'batch',
        type: 'tuple',
      },
    ],
    name: 'NewBottomUpMsgBatch',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'subnet',
        type: 'address',
      },
      {
        components: [
          {
            internalType: 'enum IpcMsgKind',
            name: 'kind',
            type: 'uint8',
          },
          {
            components: [
              {
                components: [
                  {
                    internalType: 'uint64',
                    name: 'root',
                    type: 'uint64',
                  },
                  {
                    internalType: 'address[]',
                    name: 'route',
                    type: 'address[]',
                  },
                ],
                internalType: 'struct SubnetID',
                name: 'subnetId',
                type: 'tuple',
              },
              {
                components: [
                  {
                    internalType: 'uint8',
                    name: 'addrType',
                    type: 'uint8',
                  },
                  {
                    internalType: 'bytes',
                    name: 'payload',
                    type: 'bytes',
                  },
                ],
                internalType: 'struct FvmAddress',
                name: 'rawAddress',
                type: 'tuple',
              },
            ],
            internalType: 'struct IPCAddress',
            name: 'to',
            type: 'tuple',
          },
          {
            components: [
              {
                components: [
                  {
                    internalType: 'uint64',
                    name: 'root',
                    type: 'uint64',
                  },
                  {
                    internalType: 'address[]',
                    name: 'route',
                    type: 'address[]',
                  },
                ],
                internalType: 'struct SubnetID',
                name: 'subnetId',
                type: 'tuple',
              },
              {
                components: [
                  {
                    internalType: 'uint8',
                    name: 'addrType',
                    type: 'uint8',
                  },
                  {
                    internalType: 'bytes',
                    name: 'payload',
                    type: 'bytes',
                  },
                ],
                internalType: 'struct FvmAddress',
                name: 'rawAddress',
                type: 'tuple',
              },
            ],
            internalType: 'struct IPCAddress',
            name: 'from',
            type: 'tuple',
          },
          {
            internalType: 'uint64',
            name: 'nonce',
            type: 'uint64',
          },
          {
            internalType: 'uint256',
            name: 'value',
            type: 'uint256',
          },
          {
            internalType: 'bytes',
            name: 'message',
            type: 'bytes',
          },
        ],
        indexed: false,
        internalType: 'struct IpcEnvelope',
        name: 'message',
        type: 'tuple',
      },
    ],
    name: 'NewTopDownMessage',
    type: 'event',
  },
  {
    inputs: [],
    name: 'addStake',
    outputs: [],
    stateMutability: 'payable',
    type: 'function',
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: 'uint64',
            name: 'root',
            type: 'uint64',
          },
          {
            internalType: 'address[]',
            name: 'route',
            type: 'address[]',
          },
        ],
        internalType: 'struct SubnetID',
        name: 'subnetId',
        type: 'tuple',
      },
      {
        components: [
          {
            internalType: 'uint8',
            name: 'addrType',
            type: 'uint8',
          },
          {
            internalType: 'bytes',
            name: 'payload',
            type: 'bytes',
          },
        ],
        internalType: 'struct FvmAddress',
        name: 'to',
        type: 'tuple',
      },
    ],
    name: 'fund',
    outputs: [],
    stateMutability: 'payable',
    type: 'function',
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: 'uint64',
            name: 'root',
            type: 'uint64',
          },
          {
            internalType: 'address[]',
            name: 'route',
            type: 'address[]',
          },
        ],
        internalType: 'struct SubnetID',
        name: 'subnetId',
        type: 'tuple',
      },
      {
        components: [
          {
            internalType: 'uint8',
            name: 'addrType',
            type: 'uint8',
          },
          {
            internalType: 'bytes',
            name: 'payload',
            type: 'bytes',
          },
        ],
        internalType: 'struct FvmAddress',
        name: 'to',
        type: 'tuple',
      },
      {
        internalType: 'uint256',
        name: 'amount',
        type: 'uint256',
      },
    ],
    name: 'fundWithToken',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'kill',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'genesisCircSupply',
        type: 'uint256',
      },
    ],
    name: 'register',
    outputs: [],
    stateMutability: 'payable',
    type: 'function',
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: 'uint8',
            name: 'addrType',
            type: 'uint8',
          },
          {
            internalType: 'bytes',
            name: 'payload',
            type: 'bytes',
          },
        ],
        internalType: 'struct FvmAddress',
        name: 'to',
        type: 'tuple',
      },
    ],
    name: 'release',
    outputs: [],
    stateMutability: 'payable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'amount',
        type: 'uint256',
      },
    ],
    name: 'releaseStake',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
]

const subnetAddress = '0xa4be4f813290a560c6ab712a03be3b9bc06a5871' // TODO get from config
const subnetId = { root: 314159, route: [subnetAddress] }
const EAM_ACTOR = 10
const DELEGATED = 4

const encoder = new ethers.AbiCoder()
// JavaScript equivalents of Solidity structs
class DelegatedAddress {
  constructor(namespace, length, buffer) {
    this.namespace = BigInt(namespace)
    this.length = BigInt(length)
    this.buffer = buffer
  }
}

class FvmAddress {
  constructor(addrType, payload) {
    this.addrType = addrType
    this.payload = payload
  }
}

// The function to create a FvmAddress from an Ethereum address
function from(addr) {
  // Ensure the address is valid
  if (!ethers.isAddress(addr)) {
    throw new Error('Invalid Ethereum address')
  }

  // Convert address to a byte array and construct the DelegatedAddress
  const buffer = ethers.solidityPacked(['address'], [addr])
  const delegatedAddress = new DelegatedAddress(EAM_ACTOR, 20, buffer)

  const payload = encoder.encode(
    ['tuple(uint64,uint128,bytes)'],
    [[delegatedAddress.namespace.toString(), delegatedAddress.length.toString(), delegatedAddress.buffer]]
  )
  // Construct and return the FvmAddress object
  return new FvmAddress(DELEGATED, payload)
}

export default function DepositFunds() {
  const { address } = useAccount()
  const chainId = useChainId()
  const [to, setTo] = useState()
  const [amount, setAmount] = useState('0')
  const [allowance, setAllowance] = useState('0')
  const [tokenAddress, setTokenAddress] = useState('0x20c324EabcE392F2f58f7b5DDe8308CDA218F9c9') // TODO get from config

  const { open: openModal } = useWeb3Modal()

  const { showToast } = useToast()
  const contractAddress = '0xfA6D6c9ccDE5B8a34690F0377F07dbf932b457aC' // Gateway address on calibnet TODO get from config

  const fvmTo = address ? from(address) : {}

  const contractCallArgs = {
    address: contractAddress,
    abi: fundAbi,
    functionName: 'fundWithToken',
    args: [subnetId, fvmTo, amount],
  }

  const { error: estimateError } = useSimulateContract(contractCallArgs)
  const { data, writeContract, isPending, error } = useWriteContract()
  console.log('estimate error', estimateError)

  const {
    isLoading,
    error: txError,
    isSuccess: txSuccess,
  } = useWaitForTransactionReceipt({
    hash: data,
  })

  const handleSendClick = async () => {
    writeContract(contractCallArgs)
  }

  const { data: balanceData } = useBalance({
    address: address,
    token: tokenAddress,
  })

  const tokenDigits = balanceData ? balanceData.decimals : 0

  useEffect(() => {
    setTo(address)
  }, [address])

  useEffect(() => {
    if (txSuccess) {
      showToast(`Transaction successful`, {
        type: 'success',
      })
    } else if (txError) {
      showToast(`Transaction failed: ${txError.cause}`, {
        type: 'error',
      })
    }
  }, [txSuccess, txError])

  if (chainId == 314159) {
    return (
      <div className='flex-column align-center'>
        <H1 title='Deposit Funds' />
        <>
          <RecipientInput onRecipientChange={setTo} recipient={to} />
          <BalanceDisplay balanceData={balanceData} />
          <TokenAmountInput balanceData={balanceData} onAmountChange={setAmount} />
          <Allowance
            contractAddress={contractAddress}
            amount={amount}
            tokenAddress={tokenAddress}
            allowance={allowance}
            setAllowance={setAllowance}
            tokenDigits={tokenDigits}
          />
          <Button
            text='Send tokens'
            onClick={handleSendClick}
            isLoading={isPending}
            isDisabled={
              !to || !amount || amount === '0' || isPending || amount > ethers.parseUnits(allowance, tokenDigits)
            }
          />
        </>
      </div>
    )
  } else {
    return (
      <div className='flex-column align-center'>
        <H1 title='Deposit Funds' />
        <button className='btn mt-10 btn-wide w-[100%]' onClick={() => openModal({ view: 'Networks' })}>
          Connect to Calibration Network
        </button>
      </div>
    )
  }
}
