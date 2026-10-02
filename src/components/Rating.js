import React from 'react';
import { Link } from 'react-router-dom';
import { FiArrowUpRight, FiLayers } from 'react-icons/fi';

export default function Rating() {
  return <Link className="rating-link" to="/systems"><FiLayers /> Jotafloor® epoxy & PU systems <FiArrowUpRight /></Link>;
}
