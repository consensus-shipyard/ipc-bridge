'use client'
import { ethers } from 'ethers'

export const isValidAddress = (address: string): boolean => {
  return ethers.isAddress(address)
}
